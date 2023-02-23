using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using assignment2.Models;
using assignment2.Services;
using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace assignment2.Repository
{
    public class AzureStorage : IAzureStorage
    {
        private readonly string _storageConnectionString;
        private readonly string _storagecontainerName;
        private readonly ILogger<AzureStorage> _logger;

        public AzureStorage(IConfiguration configuration, ILogger<AzureStorage> logger)
        {
            _storageConnectionString = configuration["StorageConnectionString"];
            _storagecontainerName = configuration["StorageContainerName"];
            _logger = logger;
        }

        public async Task<ImageResponse> DeleteImageAsync(string name)
        {
            BlobContainerClient client = new BlobContainerClient(_storageConnectionString, _storagecontainerName);

            BlobClient file = client.GetBlobClient(name);
            try
            {
                // Delete the file
                await file.DeleteAsync();
            }
            catch (RequestFailedException ex)
        when (ex.ErrorCode == BlobErrorCode.BlobNotFound)
            {
                // File did not exist, log to console and return new response to requesting method
                _logger.LogError($"File {name} was not found.");
                return new ImageResponse { Error = true, Status = $"File with name {name} not found." };
            }

            return new ImageResponse { Error = false, Status = $"File {name} deleted successfully." };
        }

        public async Task<ImageDto> GetImageAsync(string name)
        {
            BlobContainerClient client = new BlobContainerClient(_storageConnectionString, _storagecontainerName);

            try
            {
                BlobClient file = client.GetBlobClient(name);

                if (await file.ExistsAsync())
                {
                    var data = await file.OpenReadAsync();
                    Stream blobContent = data;

                    // Download the file details async
                    var content = await file.DownloadContentAsync();

                    // Add data to variables in order to return a BlobDto

                    string contentType = content.Value.Details.ContentType;

                    // Create new BlobDto with blob data from variables
                    return new ImageDto { Content = blobContent, Name = name, ContentType = contentType };
                }
            }
            catch (RequestFailedException ex)
        when (ex.ErrorCode == BlobErrorCode.BlobNotFound)
            {
                // Log error to console
                _logger.LogError($"File {name} was not found.");
            }
            return null;
        }

        public async Task<List<ImageDto>> GetImagesAsync()
        {
            BlobContainerClient container = new BlobContainerClient(_storageConnectionString, _storagecontainerName);
            List<ImageDto> images = new List<ImageDto>();
            await foreach (BlobItem blobItem in container.GetBlobsAsync())
            {
                string uri = container.Uri.ToString();
                var name = blobItem.Name;
                var fullUri = $"{uri}/{name}";
                images.Add(new ImageDto
                {
                    Uri = fullUri,
                    Name = name,
                    ContentType = blobItem.Properties.ContentType
                });
            }
            return images;
        }

        public async Task<ImageResponse> UploadImageAsync(IFormFile file)
        {
            ImageResponse response = new();
            try
            {
                BlobContainerClient container = new BlobContainerClient(_storageConnectionString, _storagecontainerName);
                BlobClient client = container.GetBlobClient(file.FileName);
                await using (Stream? data = file.OpenReadStream())
                {
                    // Upload the file async
                    await client.UploadAsync(data);
                }

                response.Status = $"File {file.FileName} Uploaded Successfully";
                response.Error = false;
                response.Image.Uri = client.Uri.AbsoluteUri;
                response.Image.Name = client.Name;
            }
            catch (RequestFailedException ex)
            when (ex.ErrorCode == BlobErrorCode.BlobAlreadyExists)
            {
                _logger.LogError($"File with name {file.FileName} already exists in container. Set another name to store the file in the container: '{_storagecontainerName}.'");
                response.Status = $"File with name {file.FileName} already exists. Please use another name to store your file.";
                response.Error = true;
                return response;
            }
            catch (RequestFailedException ex)
            {
                // Log error to console and create a new response we can return to the requesting method
                _logger.LogError($"Unhandled Exception. ID: {ex.StackTrace} - Message: {ex.Message}");
                response.Status = $"Unexpected error: {ex.StackTrace}. Check log with StackTrace ID.";
                response.Error = true;
                return response;
            }
            return response;
        }
    }
}