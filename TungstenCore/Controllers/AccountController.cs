using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using TungstenCore.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using TungstenCore.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TungstenCore.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<AccountController>();
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
            /*, UserRole = Roles.GetRolesForUser(model.Username)*/ 
        }


        [Route("GetUserInfo")]
        [Authorize(Roles ="Admin")]
        public async Task<ApplicationUser> GetUserInfoByIdAdmin(string id)
        {
            try //TODO: Do we need a try-catch block here?
            {
                return await _userManager.FindByIdAsync(id);
            }
            catch
            {
                return null;
            }
        }

        [Route("GetUserInfo")]
        [Authorize(Roles = "Student")]
        public async Task<ApplicationUser> GetUserInfoByIdStudent(string id)
        {
            try //TODO: Do we need a try-catch block here?
            {
                return await _userManager.FindByIdAsync(id);
            }
            catch
            {
                return null;
            }
        }

        public bool IsAuthenticated() => User.Identity.IsAuthenticated;


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
