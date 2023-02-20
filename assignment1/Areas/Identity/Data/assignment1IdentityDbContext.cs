using assignment1.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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
}
