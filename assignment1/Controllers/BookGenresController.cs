using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using assignment1.Areas.Identity.Data;
using assignment1.Models;

namespace assignment1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookGenresController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;

        public BookGenresController(assignment1IdentityDbContext context)
        {
            _context = context;
        }

        // GET: api/BookGenres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookGenre>>> GetBookGenre()
        {
          if (_context.BookGenre == null)
          {
              return NotFound();
          }
            return await _context.BookGenre.ToListAsync();
        }

        // GET: api/BookGenres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookGenre>> GetBookGenre(int id)
        {
          if (_context.BookGenre == null)
          {
              return NotFound();
          }
            var bookGenre = await _context.BookGenre.FindAsync(id);

            if (bookGenre == null)
            {
                return NotFound();
            }

            return bookGenre;
        }

        // Get all book id by genre id
        [HttpGet("book/{id}")]
        public async Task<ActionResult<IEnumerable<BookGenre>>> GetBookGenreByGenreId(int id)
        {
          if (_context.BookGenre == null)
          {
              return NotFound();
          }
            var bookGenre = await _context.BookGenre.Where(b => b.BookId == id).ToListAsync();

            if (bookGenre == null)
            {
                return NotFound();
            }

            return bookGenre;
        }

        // PUT: api/BookGenres/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookGenre(int id, BookGenre bookGenre)
        {
            if (id != bookGenre.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookGenre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookGenreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookGenres
        
        [HttpPost]
        public async Task<ActionResult<BookGenre>> PostBookGenre(BookGenre bookGenre)
        {
          if (_context.BookGenre == null)
          {
              return Problem("Entity set 'assignment1IdentityDbContext.BookGenre'  is null.");
          }
            _context.BookGenre.Add(bookGenre);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookGenre", new { id = bookGenre.Id }, bookGenre);
        }

        // DELETE: api/BookGenres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookGenre(int id)
        {
            if (_context.BookGenre == null)
            {
                return NotFound();
            }
            var bookGenre = await _context.BookGenre.FindAsync(id);
            if (bookGenre == null)
            {
                return NotFound();
            }

            _context.BookGenre.Remove(bookGenre);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookGenreExists(int id)
        {
            return (_context.BookGenre?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
