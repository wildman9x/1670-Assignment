using assignment1.Common;
using assignment1.Repository;
using assignment1.Services;
using Serilog;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using assignment1.Areas.Identity.Data;

StaticLogger.EnsureInitialized();
Log.Information("Azure Storage API Booting Up...");


var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("assignment1IdentityDbContextConnection") ?? throw new InvalidOperationException("Connection string 'assignment1IdentityDbContextConnection' not found.");

builder.Services.AddDbContext<assignment1IdentityDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<SystemUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<assignment1IdentityDbContext>();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
});
// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IAzureStorage, AzureStorage>();
Log.Information("Services has been successfully added...");
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.UseSession();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;




app.Run();
Log.Information("API is now ready to serve files to and from Azure Cloud Storage...");
