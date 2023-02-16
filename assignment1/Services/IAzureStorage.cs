using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using assignment1.Models;

namespace assignment1.Services
{
    public interface IAzureStorage
    {
        Task<ImageResponse> UploadImageAsync(IFormFile file);
        Task<ImageResponse> DeleteImageAsync(string name);
        Task<ImageDto> GetImageAsync(string name);
        Task<List<ImageDto>> GetImagesAsync();
        
    }
}