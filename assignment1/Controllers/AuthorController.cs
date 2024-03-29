using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using assignment1.Areas.Identity.Data;
using assignment1.Models;
using Microsoft.AspNetCore.Authorization;

namespace assignment1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;
        

        public AuthorController(assignment1IdentityDbContext context)
        {
            _context = context;
        }

        // GET: api/Author
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthor()
        {
          if (_context.Author == null)
          {
              return NotFound();
          }
            return await _context.Author.ToListAsync();
        }

        // GET: api/Author/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(int id)
        {
          if (_context.Author == null)
          {
              return NotFound();
          }
            var author = await _context.Author.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            return author;
        }

        // Get list of authors by book id
        [HttpGet("book/{id}")]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthorByBookId(int id)
        {
          if (_context.Author == null)
          {
              return NotFound();
          }
            var bookAuthors = await _context.BookAuthor.Where(ba => ba.BookId == id).ToListAsync();
            var authors = new List<Author>();
            foreach (var bookAuthor in bookAuthors)
            {
                var author = await _context.Author.FindAsync(bookAuthor.AuthorId);
                authors.Add(author);
            }
            return authors;
        }

        // PUT: api/Author/5
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthor(int id, Author author)
        {
            if (id != author.Id)
            {
                return BadRequest();
            }

            _context.Entry(author).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorExists(id))
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

        // POST: api/Author
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Author>> PostAuthor(Author author)
        {
          if (_context.Author == null)
          {
              return Problem("Entity set 'assignment1IdentityDbContext.Author'  is null.");
          }
            _context.Author.Add(author);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuthor", new { id = author.Id }, author);
        }

        // DELETE: api/Author/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            if (_context.Author == null)
            {
                return NotFound();
            }
            var author = await _context.Author.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            _context.Author.Remove(author);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Search author by name
        [HttpGet("SearchAuthor/{name}")]
        public async Task<ActionResult<IEnumerable<Author>>> SearchAuthor(string name)
        {
            if (_context.Author == null)
            {
                return NotFound();
            }
            // If the search string is two words, split it into two strings
            string[] nameArray = name.Split(' ');
            string firstName = nameArray[0];
            string lastName = nameArray[1];
            // Find for author whose name contains the search string
            var author = await _context.Author
            .Where(
                a => a.FirstName.Contains(firstName) || 
                a.LastName.Contains(lastName) || 
                a.FirstName.Contains(name) || 
                a.LastName.Contains(name))
            .ToListAsync();

            if (author == null)
            {
                return NotFound();
            }

            return author;
        }

        private bool AuthorExists(int id)
        {
            return (_context.Author?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
