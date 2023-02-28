using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace assignment2.Models
{
    public class ImageResponse
    {
        public string? Status { get; set; }
        public bool Error { get; set; }
        public ImageDto Image { get; set; }

        public ImageResponse()
        {
            Image = new ImageDto();
        }
    }
}