using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace assignment1.Models
{
    public class BookGenre
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int GenreId { get; set; } 
    }
}