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
    public class CartItemController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;

        public CartItemController(assignment1IdentityDbContext context)
        {
            _context = context;
        }

        // GET: api/CartItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItem()
        {
          if (_context.CartItem == null)
          {
              return NotFound();
          }
            return await _context.CartItem.ToListAsync();
        }

        // GET: api/CartItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(string id)
        {
          if (_context.CartItem == null)
          {
              return NotFound();
          }
            var cartItem = await _context.CartItem.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound();
            }

            return cartItem;
        }

        // PUT: api/CartItem/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartItem(string id, CartItem cartItem)
        {
            if (id != cartItem.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(cartItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(id))
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

        // POST: api/CartItem
        
        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(CartItem cartItem)
        {
          if (_context.CartItem == null)
          {
              return Problem("Entity set 'assignment1IdentityDbContext.CartItem'  is null.");
          }
            _context.CartItem.Add(cartItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CartItemExists(cartItem.ItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCartItem", new { id = cartItem.ItemId }, cartItem);
        }

        // DELETE: api/CartItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(string id)
        {
            if (_context.CartItem == null)
            {
                return NotFound();
            }
            var cartItem = await _context.CartItem.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItem.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartItemExists(string id)
        {
            return (_context.CartItem?.Any(e => e.ItemId == id)).GetValueOrDefault();
        }
    }
}
