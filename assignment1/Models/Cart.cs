using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment1.Models
{
    public class Cart
    {
        public Book? Book { get; set; }
        public int Quantity { get; set; }
    }
}