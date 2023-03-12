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
    public class PublisherController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;

        public PublisherController(assignment1IdentityDbContext context)
        {
            _context = context;
        }

        // GET: api/Publisher
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Publisher>>> GetPublisher()
        {
          if (_context.Publisher == null)
          {
              return NotFound();
          }
            return await _context.Publisher.ToListAsync();
        }

        // GET: api/Publisher/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Publisher>> GetPublisher(int id)
        {
          if (_context.Publisher == null)
          {
              return NotFound();
          }
            var publisher = await _context.Publisher.FindAsync(id);

            if (publisher == null)
            {
                return NotFound();
            }

            return publisher;
        }

        // PUT: api/Publisher/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPublisher(int id, Publisher publisher)
        {
            if (id != publisher.Id)
            {
                return BadRequest();
            }

            _context.Entry(publisher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublisherExists(id))
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

        // POST: api/Publisher
        
        [HttpPost]
        public async Task<ActionResult<Publisher>> PostPublisher(Publisher publisher)
        {
          if (_context.Publisher == null)
          {
              return Problem("Entity set 'assignment1IdentityDbContext.Publisher'  is null.");
          }
            _context.Publisher.Add(publisher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPublisher", new { id = publisher.Id }, publisher);
        }

        // DELETE: api/Publisher/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublisher(int id)
        {
            if (_context.Publisher == null)
            {
                return NotFound();
            }
            var publisher = await _context.Publisher.FindAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            _context.Publisher.Remove(publisher);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PublisherExists(int id)
        {
            return (_context.Publisher?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
