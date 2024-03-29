using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace assignment1.Areas.Identity.Data;


public class SystemUser : IdentityUser
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

