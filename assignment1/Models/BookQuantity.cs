using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment1.Models
{
    public class BookQuantity
    {
        // Id
        public int Id { get; set; }
        // Book
        public Book? Book { get; set; }
        // Quantity
        [Required]
        public int Quantity { get; set; } 
    }
}