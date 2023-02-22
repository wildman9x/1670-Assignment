using assignment1.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using assignment1.Models;

namespace assignment1.Areas.Identity.Data;

public class assignment1IdentityDbContext : IdentityDbContext<SystemUser>
{
    public assignment1IdentityDbContext(DbContextOptions<assignment1IdentityDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }

    public DbSet<assignment1.Models.Genre>? Genre { get; set; }

    public DbSet<assignment1.Models.Publisher>? Publisher { get; set; }

    public DbSet<assignment1.Models.Author>? Author { get; set; }

    public DbSet<assignment1.Models.Book>? Book { get; set; }

    public DbSet<assignment1.Models.BookQuantity>? BookQuantity { get; set; }

    public DbSet<assignment1.Models.CartItem>? CartItem { get; set; }

    public DbSet<assignment1.Models.Order>? Order { get; set; }

    

    
}
