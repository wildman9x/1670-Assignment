using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using assignment1.Areas.Identity.Data;
using assignment1.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace assignment1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;

        public HomeController(assignment1IdentityDbContext context)
        {
            _context = context;
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