using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment1.Models
{
    public class CartItem
    {
        [Key]
        public string ItemId { get; set; }
        public string CartId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public int OrderId  { get; set; }
    }
}