using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment1.Models
{
    public class Order
    {
        // Id
        public int Id { get; set; }
        // Name
        [Required]
        public string? Name { get; set; }
        // Email
        [EmailAddress]
        [Required]
        public string? Email { get; set; }
        // Phone
        [Phone]
        [Required]
        public string? Phone { get; set; }
        // Address
        [Required]
        public string? Address { get; set; }
        // Cart
        public List<Cart>? Cart { get; set; }
    }
}