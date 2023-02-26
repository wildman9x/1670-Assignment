using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using assignment1.Areas.Identity.Data;
using assignment1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace assignment1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;
        static HttpClient client = new HttpClient();
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
                       BookId = id,
                       Quantity = 1
                   }
               };
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(listCart));

            }
            else
            {
                List<CartItem>? dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
                bool check = true;
                for (int i = 0; i < dataCart.Count; i++)
                {
                    if (dataCart[i].BookId == id)
                    {
                        dataCart[i].Quantity++;
                        check = false;
                    }
                }
                if (check)
                {
                    dataCart.Add(new CartItem
                    {
                        BookId = id,
                        Quantity = 1
                    });
                }
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(dataCart));
            }
            return CreatedAtAction("GetBook", new { book = await getDetailBook(id) });

        }

        // GET: api/Home
        [HttpGet("ListCart")]
        // List all items in the cart
        public async Task<ActionResult<List<CartItem>>> listCart()
        {
            var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                // create new cart
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(new List<CartItem>()));
                return new List<CartItem>();
            }
            List<CartItem>? dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            return dataCart;
        }

        [HttpPost]
        // Update CartItem
        public async Task<ActionResult<CartItem>> updateCart(int id, int Quantity)
        {
            var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                return NotFound();
            }
            List<CartItem>? dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);

            if (dataCart == null)
            {
                return NotFound();
            }
            if (Quantity == 0)
            {
                for (int i = 0; i < dataCart.Count; i++)
                {
                    foreach (var item in dataCart)
                    {
                        if (item.BookId == id)
                        {
                            dataCart.Remove(item);
                            break;
                        }
                    }
                }
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(dataCart));
                return Ok(await getDetailBook(id));
            } else
            {
                for (int i = 0; i < dataCart.Count; i++)
                {
                    if (dataCart[i].BookId == id)
                    {
                        dataCart[i].Quantity = Quantity;
                    }
                }
            }
            
            HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(dataCart));
            return Ok(await getDetailBook(id));
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
            List<CartItem>? dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            for (int i = 0; i < dataCart.Count; i++)
            {
                if (dataCart[i].BookId == id)
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
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(new List<CartItem>()));
                return 0.0m;
            }
            List<CartItem>? dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            decimal total = 0.0m;
            for (int i = 0; i < dataCart.Count; i++)
            {
                Book book = await getDetailBook(dataCart[i].BookId);
                var price = book.Price;
                total += price * dataCart[i].Quantity;
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
            List<CartItem>? dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return NotFound();
            }
            for (int i = 0; i < dataCart.Count; i++)
            {
                if (dataCart[i].BookId == id)
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

        // Count number of books in cart
        [HttpGet("CountCart")]
        public async Task<ActionResult<int>> countCart()
        {
            var cart = HttpContext.Session.GetString("cart");
            if (cart == null)
            {
                HttpContext.Session.SetString("cart", JsonConvert.SerializeObject(new List<CartItem>()));
                return Ok(0);
            }
            List<CartItem>? dataCart = JsonConvert.DeserializeObject<List<CartItem>>(cart);
            if (dataCart == null)
            {
                return Ok(0);
            }
            
            return dataCart.Count;
        }

        [HttpGet("Book/{id}")]
        // Get Detail Book
        public async Task<Book> getDetailBook(int id)
        {
            HttpResponseMessage response = await client.GetAsync("https://localhost:7202/api/Book/" + id);
            var book = await response.Content.ReadAsAsync<Book>();
            return book;
        }
    }
}