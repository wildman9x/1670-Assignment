using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using assignment1.Models;
using assignment1.Services;
using Microsoft.AspNetCore.Mvc;

namespace assignment1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StorageApiController : ControllerBase
    {
        private readonly IAzureStorage _storage;

        public StorageApiController(IAzureStorage storage)
        {
            _storage = storage;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            // Get all files at the Azure Storage Location and return them
            List<ImageDto>? files = await _storage.GetImagesAsync();

            // Returns an empty array if no files are present at the storage container
            return StatusCode(StatusCodes.Status200OK, files);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            ImageResponse? response = await _storage.UploadImageAsync(file);

            // Check if we got an error
            if (response.Error == true)
            {
                // We got an error during upload, return an error with details to the client
                return StatusCode(StatusCodes.Status500InternalServerError, response.Status);
            }
            else
            {
                // Return a success message to the client about successfull upload
                return StatusCode(StatusCodes.Status200OK, response);
            }
        }

        [HttpGet("{filename}")]
        public async Task<IActionResult> Download(string filename)
        {
            ImageDto? file = await _storage.GetImageAsync(filename);

            // Check if file was found
            if (file == null)
            {
                // Was not, return error message to client
                return StatusCode(StatusCodes.Status500InternalServerError, $"File {filename} could not be downloaded.");
            }
            else
            {
                // File was found, return it to client
                return File(file.Content, file.ContentType, file.Name);
            }
        }

        [HttpDelete("{filename}")]
        public async Task<IActionResult> Delete(string filename)
        {
            ImageResponse response = await _storage.DeleteImageAsync(filename);

            // Check if we got an error
            if (response.Error == true)
            {
                // Return an error message to the client
                return StatusCode(StatusCodes.Status500InternalServerError, response.Status);
            }
            else
            {
                // File has been successfully deleted
                return StatusCode(StatusCodes.Status200OK, response.Status);
            }
        }
    }
}