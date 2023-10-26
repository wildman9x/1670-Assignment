using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment1.Models
{
    public class Author
    {
        // Id
        public int Id { get; set; } 
        // First Name
        [Required]
        public string? FirstName { get; set; } 
        // Last Name
        [Required]
        public string? LastName { get; set; } 
        // Birth Date
        [Required]
        public DateTime BirthDate { get; set; } 
        // Birth Place
        [Required]
        public string? BirthPlace { get; set; } 
        // Death Date
        public DateTime? DeathDate { get; set; } 
        // Death Place
        public string? DeathPlace { get; set; } 
        // Biography
        [Required]
        public string? Biography { get; set; } 
        // Image
        public string? Image { get; set; } 
    }
}