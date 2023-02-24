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
    public class BookController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;

        public BookController(assignment1IdentityDbContext context)
        {
            _context = context;
        }

        // GET: api/Book
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBook()
        {
          if (_context.Book == null)
          {
              return NotFound();
          }
            return await _context.Book.ToListAsync();
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
          if (_context.Book == null)
          {
              return NotFound();
          }
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Book/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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

        // POST: api/Book
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
          if (_context.Book == null)
          {
              return Problem("Entity set 'assignment1IdentityDbContext.Book'  is null.");
          }
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            if (_context.Book == null)
            {
                return NotFound();
            }
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Search books by name
        [HttpGet("SearchBook/{name}")]
        public async Task<ActionResult<IEnumerable<Book>>> SearchBook(string name)
        {
            if (_context.Book == null)
            {
                return NotFound();
            }
            var book = await _context.Book.Where(b => b.Title.Contains(name)).ToListAsync();

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // Get all books of a genre, accepts Id as a parameter
        // Go through the list of books and find the ones that have the same genre id
        [HttpGet("GetBooksByGenre/{genreId}")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooksByGenre(int genreId)
        {
            if (_context.Book == null)
            {
                return NotFound();
            }
            var genreToFind = await _context.Genre.FindAsync(genreId);
            var book = await _context.Book.Where(b => b.Genres.Contains(genreToFind)).ToListAsync();

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // Get all books of an author, accepts Id as a parameter
        // Go through the list of books and find the ones that have the same author id
        [HttpGet("GetBooksByAuthor/{authorId}")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooksByAuthor(int authorId)
        {
            if (_context.Book == null)
            {
                return NotFound();
            }
            var authorToFind = await _context.Author.FindAsync(authorId);
            var book = await _context.Book.Where(b => b.Authors.Contains(authorToFind)).ToListAsync();

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // Get all books of a publisher, accepts Id as a parameter  
        // Go through the list of books and find the ones that have the same publisher id
        [HttpGet("GetBooksByPublisher/{publisherId}")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooksByPublisher(int publisherId)
        {
            if (_context.Book == null)
            {
                return NotFound();
            }
            var publisherToFind = await _context.Publisher.FindAsync(publisherId);
            var book = await _context.Book.Where(b => b.Publisher == publisherToFind).ToListAsync();

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        private bool BookExists(int id)
        {
            return (_context.Book?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
