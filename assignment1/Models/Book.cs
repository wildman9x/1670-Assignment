using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment1.Models
{
    public class Book
    {
        // Id
        public int Id { get; set; }
        // Title
        [Required]
        public string? Title { get; set; }
        // Author
        // [Required]
        public List<BookAuthor>? AuthorsId { get; set; }
        // Genre
        // [Required]
        public List<BookGenre>? GenresId { get; set; }
        // Publisher
        [Required]
        public int? PublisherId { get; set; }
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