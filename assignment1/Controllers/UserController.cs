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

namespace assignment1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<SystemUser> _signInManager;
        private readonly UserManager<SystemUser> _userManager;
        private readonly IUserStore<SystemUser> _userStore;
        private readonly IUserEmailStore<SystemUser> _emailStore;
        private readonly ILogger<UserController> _logger;
        private readonly IEmailSender _emailSender;

        public UserController(
            UserManager<SystemUser> userManager,
            IUserStore<SystemUser> userStore,
            SignInManager<SystemUser> signInManager,
            ILogger<UserController> logger,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
        }

        private IUserEmailStore<SystemUser> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<SystemUser>)_userStore;
        }

        // [Authorize(Roles = "Admin")]
        // Uncomment this after you create an admin user
        [HttpPost("CreateUser")]
        // Create user and assign role to them
        public async Task<IActionResult> CreateUser(SystemUser user) {
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded) {
                await _userManager.AddToRoleAsync(user, "User");
                return Ok();
            }
            return BadRequest();
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
        
        // Let the admin add role to the database
        
    }
}