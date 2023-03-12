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
    public class BookQuantityController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;

        public BookQuantityController(assignment1IdentityDbContext context)
        {
            _context = context;
        }

        // GET: api/BookQuantity
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookQuantity>>> GetBookQuantity()
        {
          if (_context.BookQuantity == null)
          {
              return NotFound();
          }
            return await _context.BookQuantity.ToListAsync();
        }

        // GET: api/BookQuantity/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookQuantity>> GetBookQuantity(int id)
        {
          if (_context.BookQuantity == null)
          {
              return NotFound();
          }
            var bookQuantity = await _context.BookQuantity.FindAsync(id);

            if (bookQuantity == null)
            {
                return NotFound();
            }

            return bookQuantity;
        }

        // PUT: api/BookQuantity/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookQuantity(int id, BookQuantity bookQuantity)
        {
            if (id != bookQuantity.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookQuantity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookQuantityExists(id))
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

        // POST: api/BookQuantity
        
        [HttpPost]
        public async Task<ActionResult<BookQuantity>> PostBookQuantity(BookQuantity bookQuantity)
        {
          if (_context.BookQuantity == null)
          {
              return Problem("Entity set 'assignment1IdentityDbContext.BookQuantity'  is null.");
          }
            _context.BookQuantity.Add(bookQuantity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookQuantity", new { id = bookQuantity.Id }, bookQuantity);
        }

        // DELETE: api/BookQuantity/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookQuantity(int id)
        {
            if (_context.BookQuantity == null)
            {
                return NotFound();
            }
            var bookQuantity = await _context.BookQuantity.FindAsync(id);
            if (bookQuantity == null)
            {
                return NotFound();
            }

            _context.BookQuantity.Remove(bookQuantity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookQuantityExists(int id)
        {
            return (_context.BookQuantity?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
