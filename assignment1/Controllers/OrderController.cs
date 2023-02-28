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
using assignment1.Helpers;

namespace assignment1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;
        static HttpClient client = new HttpClient();

        public OrderController(assignment1IdentityDbContext context)
        {
            _context = context;
        }

        [Authorize]
        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
            var orders = await _context.Order.ToListAsync();
            foreach (var item in orders)
            {
                item.CartItems = await _context.CartItem.Where(c => c.OrderId == item.Id).ToListAsync();
            }
            return orders;
        }

        [Authorize]
        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
            var order = await _context.Order.FindAsync(id);
            order.CartItems = await _context.CartItem.Where(c => c.OrderId == id).ToListAsync();
            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // Search for orders by phone number
        [HttpGet("search/{phone}")]
        public async Task<ActionResult<IEnumerable<Order>>> SearchOrder(string phone)
        {
          if (_context.Order == null)
          {
              return NotFound();
          }
            var orders = await _context.Order.Where(o => o.Phone == phone).ToListAsync();
            foreach (var item in orders)
            {
                item.CartItems = await _context.CartItem.Where(c => c.OrderId == item.Id).ToListAsync();
            }
            if (orders == null)
            {
                return NotFound();
            }

            return orders;
        }

        [Authorize]
        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
          if (_context.Order == null)
          {
              return Problem("Entity set 'assignment1IdentityDbContext.Order'  is null.");
          }
            _context.Order.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        [Authorize]
        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Order == null)
            {
                return NotFound();
            }
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Find all orders by phone number
        // [HttpGet("find/{phone}")]
        // public async Task<ActionResult<IEnumerable<Order>>> FindOrder(string phone)
        // {
        //   if (_context.Order == null)
        //   {
        //       return NotFound();
        //   }
        //     var orders = await _context.Order.Where(o => o.Phone == phone).ToListAsync();

        //     if (orders == null)
        //     {
        //         return NotFound();
        //     }

        //     return orders;
        // }

        // GET: api/CheckOut
        // Gather all the cart items and return them
        // If no cart is found, return a 404
        [HttpGet("checkout")]
        public async Task<ActionResult<IEnumerable<CartItem>>> CheckOut()
        {
            HttpResponseMessage response = await client.GetAsync(DomainName.Uri + "/api/Home/ListCart");
            List<CartItem> dataCart = await response.Content.ReadAsAsync<List<CartItem>>();
            return dataCart;
        }

        public class OrderInfo
        {
            public string name { get; set; }
            public string email { get; set; }
            public string phone { get; set; }
            public string address { get; set; }
            public decimal total { get; set; }
        }

        // POST: api/CheckOut
        [HttpPost("checkout")]
        public async Task<ActionResult<Order>> CheckOut(OrderInfo orderInfo)
        {
          var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                return NotFound();
            }
            Order order = new Order{
                Name = orderInfo.name,
                Email = orderInfo.email,
                Phone = orderInfo.phone,
                Address = orderInfo.address,
                CartItems = new List<CartItem>(),
                Total = orderInfo.total
            };
            List<CartItem> dataCart = Newtonsoft.Json.JsonConvert.DeserializeObject<List<CartItem>>(cart);
            order.CartItems = dataCart;
            foreach (var item in order.CartItems)
            {
                // give each itemid an uuid
                item.ItemId = Guid.NewGuid().ToString();
                item.CartId = Guid.NewGuid().ToString();
            }
            _context.Order.Add(order);
            await _context.SaveChangesAsync();
            HttpContext.Session.SetString("cart", "");
            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        private bool OrderExists(int id)
        {
            return (_context.Order?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
