using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using assignment2.Data;
using assignment2.Models;
using Newtonsoft.Json;

namespace assignment2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBook()
        {
            if (_context.Book == null)
            {
                return NotFound();
            }
            return await _context.Book.ToListAsync();
        }

        // GET: api/Books/5
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

        

        // PUT: api/Books/5
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

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            if (_context.Book == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Book'  is null.");
            }
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
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

        private bool BookExists(int id)
        {
            return (_context.Book?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("AddToCart/{id}")]
        // Add CartItem to Cart
        public async Task<ActionResult<CartItem>> addCart(int id)
        {
            var cart = HttpContext.Session.GetString("cart");//get key cart
            if (cart == null)
            {
                var book = await getDetailBook(id);
                List<CartItem> listCart = new List<CartItem>()
               {
                   new CartItem
                   {
                       Book = book,
                       Quantity = 1
                   }
               };
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(listCart));

            }
            else
            {
                List<CartItem> dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
                bool check = true;
                for (int i = 0; i < dataCart.Count; i++)
                {
                    if (dataCart[i].Book.Id == id)
                    {
                        dataCart[i].Quantity++;
                        check = false;
                    }
                }
                if (check)
                {
                    dataCart.Add(new CartItem
                    {
                        Book = await getDetailBook(id),
                        Quantity = 1
                    });
                }
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(dataCart));
            }
            return CreatedAtAction("GetBook", new { id = id }, id);

        }

        [HttpGet("ListCart/{id}")]
        // List all items in the cart
        public async Task<ActionResult<List<CartItem>>> listCart()
        {
            var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                // create new cart
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(new List<CartItem>()));
            }
            List<CartItem> dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            return dataCart;
        }

        [HttpPost]
        // Update CartItem
        public async Task<ActionResult<CartItem>> updateCart(CartItem cartItem, int Quantity)
        {
            var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                return NotFound();
            }
            List<CartItem> dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            if (Quantity == 0)
            {
                for (int i = 0; i < dataCart.Count; i++)
                {
                    if (dataCart[i].Book.Id == cartItem.Book.Id)
                    {
                        dataCart.RemoveAt(i);
                    }
                }
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(dataCart));
                return Ok(await getDetailBook(cartItem.Book.Id));
            }
            for (int i = 0; i < dataCart.Count; i++)
            {
                if (dataCart[i].Book.Id == cartItem.Book.Id)
                {
                    dataCart[i].Quantity = Quantity;
                }
            }
            HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(dataCart));
            return Ok(await getDetailBook(cartItem.Book.Id));
        }

        [HttpGet("DeleteCartItem/{id}")]
        // Delete CartItem
        public async Task<ActionResult<CartItem>> deleteCartItem(int id)
        {
            var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                return NotFound();
            }
            List<CartItem> dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            for (int i = 0; i < dataCart.Count; i++)
            {
                if (dataCart[i].Book.Id == id)
                {
                    dataCart.RemoveAt(i);
                }
            }
            HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(dataCart));
            return Ok(await getDetailBook(id));
        }

        [HttpGet("ClearCart")]
        // Clear Cart
        public async Task<ActionResult<CartItem>> clearCart()
        {
            HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(new List<CartItem>()));
            return Ok();
        }

        [HttpGet("TotalCart")]
        // Total Cart
        public async Task<ActionResult<Decimal>> totalCart()
        {
            var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                return NotFound();
            }
            List<CartItem> dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            decimal total = 0.0m;
            for (int i = 0; i < dataCart.Count; i++)
            {
                total += dataCart[i].Book.Price * dataCart[i].Quantity;
            }
            return total;
        }

        // Decrease CartItem by 1
        [HttpGet("DecreaseCartItem/{id}")]
        public async Task<ActionResult<CartItem>> decreaseCartItem(int id)
        {
            var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                return NotFound();
            }
            List<CartItem> dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            for (int i = 0; i < dataCart.Count; i++)
            {
                if (dataCart[i].Book.Id == id)
                {
                    if (dataCart[i].Quantity > 1)
                    {
                        dataCart[i].Quantity--;
                    }
                }
            }
            HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(dataCart));
            return Ok(await getDetailBook(id));
        }

        // Get Detail Book
        public async Task<Book> getDetailBook(int id)
        {
            var book = _context.Book.Where(x => x.Id == id).FirstOrDefault();
            return book;
        }


    }
}
