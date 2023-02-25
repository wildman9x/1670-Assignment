using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using assignment1.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity.UI.Services;
// using assignment1.Areas.Identity.Pages.Account;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

namespace assignment1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<SystemUser> _signInManager;
        private readonly UserManager<SystemUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUserStore<SystemUser> _userStore;
        private readonly IUserEmailStore<SystemUser> _emailStore;
        private readonly ILogger<UserController> _logger;
        private readonly IEmailSender _emailSender;
        private object returnUrl;

        public UserController(
            UserManager<SystemUser> userManager,
            IUserStore<SystemUser> userStore,
            SignInManager<SystemUser> signInManager,
            ILogger<UserController> logger,
            RoleManager<IdentityRole> roleManager,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _roleManager = roleManager;
        }

        private IUserEmailStore<SystemUser> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<SystemUser>)_userStore;
        }

        public LogInInputModel LoginInput { get; set; }
        public RegisterInputModel RegisterInput { get; set; }
        public IList<AuthenticationScheme> ExternalLogins { get; set; }
        public class LogInInputModel {
            [Required]
            [EmailAddress]
            public string Email { get; set; }
            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }
            [Display(Name = "Remember me?")]
            public bool RememberMe { get; set; }
        }

        public class RegisterInputModel {
            [Required]
            [EmailAddress]
            [Display(Name = "Email")]
            public string Email { get; set; }
            [Required]
            [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Password")]
            public string Password { get; set; }
            [DataType(DataType.Password)]
            [Display(Name = "Confirm password")]
            [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
            public string ConfirmPassword { get; set; }
        } 
        
        // [Authorize(Roles = "Admin")]
        // Uncomment this after you create an admin user
        [HttpPost("CreateUser")]
        // Create user and assign role to them
        public async Task<IActionResult> AddUser(string FirstName, string LastName, DateTime BirthDate,string email, string password, string role) {
            var user = new SystemUser {
                UserName = email,
                Email = email,
                FirstName = FirstName,
                LastName = LastName,
                BirthDate = BirthDate
            };
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded) {
                await _userManager.AddToRoleAsync(user, role);
                return Ok();
            }
            return BadRequest();
        }

        private SystemUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<SystemUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(SystemUser)}'. " +
                    $"Ensure that '{nameof(SystemUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        // Let the currently logged in user see their own information
        [Authorize]
        [HttpGet("UserInfo")]
        public async Task<IActionResult> UserInfo() {
            var user = await _userManager.GetUserAsync(User);
            return Ok(user);
        }

        // Let the user update their own information
        [Authorize]
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(SystemUser user) {
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) {
                return Ok();
            }
            return BadRequest();
        }

        //  Let the admin delete a user
        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(string id) {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null) {
                var result = await _userManager.DeleteAsync(user);
                if (result.Succeeded) {
                    return Ok();
                }
            }
            return BadRequest();
        }
        
        // Create a role
        [HttpPost("CreateRole")]
        public async Task<IActionResult> CreateRole(string role) {
            var result = await _roleManager.CreateAsync(new IdentityRole(role));
            if (result.Succeeded) {
                return Ok();
            }
            return BadRequest();
        }

        // Log in a user
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LogInInputModel model) {
            if (ModelState.IsValid) {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded) {
                    _logger.LogInformation("User logged in.");
                    return Ok();
                }
                if (result.RequiresTwoFactor) {
                    return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = LoginInput.RememberMe });
                }
                if (result.IsLockedOut) {
                    _logger.LogWarning("User account locked out.");
                    return RedirectToPage("./Lockout");
                }
                else {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        // Log a user out
        // [Authorize]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout() {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return Ok();
        }

        // Allow admin to see the information of another user
        [Authorize(Roles = "Admin")]
        [HttpGet("GetUser/{id}")]
        public async Task<IActionResult> GetUser(string id) {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null) {
                return Ok(user);
            }
            return BadRequest();
        }

        // Allow admin to see all users
        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers() {
            var users = _userManager.Users;
            return Ok(users);
        }

    }
}