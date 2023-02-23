using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace assignment2.Models
{
    public class Genre
    {
        // Id
        public int Id { get; set; }
        // Name
        [Required]
        public string? Name { get; set; }

    }
}