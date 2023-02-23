using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment2.Models
{
    public class Publisher
    {
        // Id
        public int Id { get; set; }
        // Name
        [Required]
        public string? Name { get; set; }
        // Address
        [Required]
        public string? Address { get; set; }
        // Country
        [Required]
        public string? Country { get; set; }
        // Phone
        [RegularExpression(@"^(\d{3}-\d{3}-\d{4})$", ErrorMessage = "Phone number must be in the format 123-456-7890")]
        [Required]
        public string? Phone { get; set; }
    }
}