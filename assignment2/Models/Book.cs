using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment2.Models
{
    public class Book
    {
        // Id
        public int Id { get; set; }
        // Title
        [Required]
        public string? Title { get; set; }
        // Author
        [Required]
        public List<Author>? Authors { get; set; }
        // Genre
        [Required]
        public List<Genre>? Genres { get; set; }
        // Publisher
        [Required]
        public Publisher? Publisher { get; set; }
        // Publish Date
        [Required]
        public DateTime PublishDate { get; set; }
        // Price
        // Only positive numbers
        [Range(0, double.MaxValue, ErrorMessage = "Price must be positive")]
        [Required]
        public decimal Price { get; set; }
        // Image
        public string? Image { get; set; }
    }
}