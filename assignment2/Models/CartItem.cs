using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment2.Models
{
    public class CartItem
    {
        public string Id { get; set; }
        public string CartId { get; set; }
        public Book? Book { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}