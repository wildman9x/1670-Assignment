using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using assignment2.Models;

namespace assignment2.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {

    }
    public DbSet<assignment2.Models.Author>? Author { get; set; }
    public DbSet<assignment2.Models.Publisher>? Publisher { get; set; }
    public DbSet<assignment2.Models.Genre>? Genre { get; set; }
    public DbSet<assignment2.Models.Book>? Book { get; set; }
    public DbSet<assignment2.Models.BookQuantity>? BookQuantity { get; set; }
    public DbSet<assignment2.Models.Order>? Order { get; set; }
    public DbSet<assignment2.Models.CartItem>? CartItem { get; set; }
}
