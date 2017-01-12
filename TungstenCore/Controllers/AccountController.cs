using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using TungstenCore.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using TungstenCore.DataAccess;
using TungstenCore.ViewModels;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TungstenCore.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;
        private readonly ISchoolRepository _repository;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILoggerFactory loggerFactory,
            ISchoolRepository repository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<AccountController>();
            _repository = repository;
        }

        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<SignInResultViewModel> Login([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return new SignInResultViewModel { Succeeded = false, Message = "Model state not valid" };

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, lockoutOnFailure: false);

            return new SignInResultViewModel
            {
                Succeeded = result.Succeeded,
                Message = result.Succeeded ? "Login Success" : "Login Failed"
            };
        }

        [HttpPost]
        public async Task<SignInResultViewModel> LogOff()
        {
            await _signInManager.SignOutAsync();
            return new SignInResultViewModel
            {
                Succeeded = true,
                Message = "Should be loggedoff!"
            };
        }
        
        /// <summary>
        /// Gets the user info for the logged in user
        /// </summary>
        /// <returns>
        ///     UserInfo ViewModel.
        /// </returns>
        public async Task<UserInfo> GetUserInfo()
        {
            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);
            return new UserInfo
            {
                Name = user.Name,
                Username = user.UserName,
                Email = user.Email,
                Roles = await _userManager.GetRolesAsync(user)
            };
        }

        [Authorize(Roles = "Admin, Teacher")]
        public async Task<UserInfo> GetUserInfoById(string id)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(id);
            return new UserInfo
            {
                Name = user.Name,
                Username = user.UserName,
                Email = user.Email,
                Roles = await _userManager.GetRolesAsync(user)
            };
        }

        public bool IsAuthenticated() => 
            User.Identity.IsAuthenticated;

        public async Task<HomePageViewModel> GetHomePage()
        {
            ApplicationUser identityUser = await _userManager.GetUserAsync(HttpContext.User);
            ApplicationUser contextUser = await _repository.GetAttachedUser(identityUser);

            IList<string> roles = await _userManager.GetRolesAsync(identityUser);

            switch (roles.FirstOrDefault())
            {
                case "Teacher":
                case "Admin":
                default: // Student
                    {
                        // Select used to complete many-to-many relationship.
                        
                        var groups = contextUser.Groups.Select(g => g.Group);
                        var courses = groups.First().Courses.Take(3);
                        var assignments =
                            groups.First().Courses
                                .SelectMany(c => c.Segments)
                                .SelectMany(s => s.Assignments);


                        return new HomePageViewModel
                        {
                            Groups = groups,
                            Courses = courses,
                            Assignments = assignments
                        };
                    }
            }
        }

        // TODO: Implement Registration Logic.
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Register(RegisterViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
        //        var result = await _userManager.CreateAsync(user, model.Password);
        //        if (result.Succeeded)
        //        {
        //            // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
        //            // Send an email with this link
        //            //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        //            //var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
        //            //await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
        //            //    "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");
        //            await _signInManager.SignInAsync(user, isPersistent: false);
        //            _logger.LogInformation(3, "User created a new account with password.");
        //            return RedirectToAction(nameof(HomeController.Index), "Home");
        //        }
        //        AddErrors(result);
        //    }

        //    // If we got this far, something failed, redisplay form
        //    return View(model);
        //}

    }
}
