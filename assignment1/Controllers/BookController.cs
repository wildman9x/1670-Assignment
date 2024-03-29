using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using assignment1.Areas.Identity.Data;
using assignment1.Models;
using assignment1.Helpers;
using Serilog;

namespace assignment1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly assignment1IdentityDbContext _context;

        static HttpClient client = new HttpClient();

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
            var books = await _context.Book.ToListAsync();
            // foreach (var item in books)
            // {
            //     // Look through the BookAuthor model and find the matching book id
            //     HttpResponseMessage response = await client.GetAsync(DomainName.Uri + "/api/BookAuthors/book/" + item.Id);
            //     var authorIdToFind = await response.Content.ReadAsAsync<List<BookAuthor>>();
            //     item.AuthorsId = authorIdToFind.Where(a => a.BookId == item.Id).ToList();


            //     // Look through the BookAuthor model and find the matching book id
            //     HttpResponseMessage response2 = await client.GetAsync(DomainName.Uri + "/api/BookGenres/book/" + item.Id);
            //     var genreIdToFind = await response2.Content.ReadAsAsync<List<BookGenre>>();
            //     // Add the genre id to the book where the book id matches
            //     item.GenresId = genreIdToFind.Where(g => g.BookId == item.Id).ToList();
            // }
            Task.WaitAll(books.Select(async item =>
            {
                Log.Information("Getting Authors for book: " + item.Title + "");
                // Look through the BookAuthor model and find the matching book id
                HttpResponseMessage response = await client.GetAsync(DomainName.Uri + "/api/BookAuthors/book/" + item.Id);
                var authorIdToFind = await response.Content.ReadAsAsync<List<BookAuthor>>();
                item.AuthorsId = authorIdToFind.Where(a => a.BookId == item.Id).ToList();

                Log.Information("Getting Genres for book: " + item.Title + "");
                HttpResponseMessage response2 = await client.GetAsync(DomainName.Uri + "/api/BookGenres/book/" + item.Id);
                var genreIdToFind = await response2.Content.ReadAsAsync<List<BookGenre>>();
                // Add the genre id to the book where the book id matches
                item.GenresId = genreIdToFind.Where(g => g.BookId == item.Id).ToList();
            }).ToArray());
            return books;
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

            // Look through the BookAuthor model and find the matching book id
                HttpResponseMessage response = await client.GetAsync(DomainName.Uri + "/api/BookAuthors/book/" + book.Id);
                var authorIdToFind = await response.Content.ReadAsAsync<List<BookAuthor>>();
                book.AuthorsId = authorIdToFind.Where(a => a.BookId == book.Id).ToList();


                // Look through the BookAuthor model and find the matching book id
                HttpResponseMessage response2 = await client.GetAsync(DomainName.Uri + "/api/BookGenres/book/" + book.Id);
                var genreIdToFind = await response2.Content.ReadAsAsync<List<BookGenre>>();
                // Add the genre id to the book where the book id matches
                book.GenresId = genreIdToFind.Where(g => g.BookId == book.Id).ToList();

            return book;
        }

        // PUT: api/Book/5
        
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
        
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
          if (_context.Book == null)
          {
              return Problem("Entity set 'assignment1IdentityDbContext.Book'  is null.");
          }
            foreach (var item in book.AuthorsId)
            {
                // Add the book id to the book author model
                item.BookId = book.Id;
                // Add the book author model to the database
                _context.BookAuthor.Add(item);
            }
            foreach (var item in book.GenresId)
            {
                // Add the book id to the book genre model
                item.BookId = book.Id;
                // Add the book genre model to the database
                _context.BookGenre.Add(item);
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
            // Check the genreId with bookgenre model
            
            var book = await _context.Book.Where(b => b.GenresId.Any(g => g.GenreId == genreId)).ToListAsync();
            // foreach (var item in book)
            // {
            //     // Look through the BookAuthor model and find the matching book id
            //     HttpResponseMessage response = await client.GetAsync(DomainName.Uri + "/api/BookAuthors/book/" + item.Id);
            //     var authorIdToFind = await response.Content.ReadAsAsync<List<BookAuthor>>();
            //     item.AuthorsId = authorIdToFind.Where(a => a.BookId == item.Id).ToList();

            //     // Look through the BookAuthor model and find the matching book id
            //     HttpResponseMessage response2 = await client.GetAsync(DomainName.Uri + "/api/BookGenres/book/" + item.Id);
            //     var genreIdToFind = await response2.Content.ReadAsAsync<List<BookGenre>>();
            //     // Add the genre id to the book where the book id matches
            //     item.GenresId = genreIdToFind.Where(g => g.BookId == item.Id).ToList();
            // }
            Task.WaitAll(book.Select(async b =>
            {
                // Look through the BookAuthor model and find the matching book id
                HttpResponseMessage response = await client.GetAsync(DomainName.Uri + "/api/BookAuthors/book/" + b.Id);
                var authorIdToFind = await response.Content.ReadAsAsync<List<BookAuthor>>();
                b.AuthorsId = authorIdToFind.Where(a => a.BookId == b.Id).ToList();

                // Look through the BookAuthor model and find the matching book id
                HttpResponseMessage response2 = await client.GetAsync(DomainName.Uri + "/api/BookGenres/book/" + b.Id);
                var genreIdToFind = await response2.Content.ReadAsAsync<List<BookGenre>>();
                // Add the genre id to the book where the book id matches
                b.GenresId = genreIdToFind.Where(g => g.BookId == b.Id).ToList();
            }).ToArray());
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
            // var bookAuthorToFind = await _context.BookAuthor.FindAsync(authorId);
            // match bookAuthorToFind.AuthorId with book.AuthorsId
            var book = await _context.Book.Where(b => b.AuthorsId.Any(a => a.AuthorId == authorId)).ToListAsync();
            Task.WaitAll(book.Select(async b =>
            {
                // Look through the BookAuthor model and find the matching book id
                HttpResponseMessage response = await client.GetAsync(DomainName.Uri + "/api/BookAuthors/book/" + b.Id);
                var authorIdToFind = await response.Content.ReadAsAsync<List<BookAuthor>>();
                b.AuthorsId = authorIdToFind.Where(a => a.BookId == b.Id).ToList();

                // Look through the BookAuthor model and find the matching book id
                HttpResponseMessage response2 = await client.GetAsync(DomainName.Uri + "/api/BookGenres/book/" + b.Id);
                var genreIdToFind = await response2.Content.ReadAsAsync<List<BookGenre>>();
                // Add the genre id to the book where the book id matches
                b.GenresId = genreIdToFind.Where(g => g.BookId == b.Id).ToList();
            }).ToArray());
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
            // var publisherToFind = await _context.Publisher.FindAsync(publisherId);
            var book = await _context.Book.Where(b => b.PublisherId == publisherId).ToListAsync();

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
