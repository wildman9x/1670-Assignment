using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace assignment2.Models;

public class ApplicationUser : IdentityUser
{
    [PersonalData]
    [Required]
    [StringLength(100)]
    public string? FirstName { get; set; }
    [PersonalData]
    [Required]
    [StringLength(100)]
    public string? LastName { get; set; }
    [PersonalData]
    [Required]
    public DateTime BirthDate { get; set; }
}
