using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TungstenCore.Controllers
{
    using DataAccess;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using ViewModels;

    [Authorize]
    public class HomeController : Controller
    {
        private ISchoolContext _context;

        //TODO: Usermanager? Get Schedule etc.

        public HomeController(ISchoolContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }

        public IAsyncEnumerable<ApplicationUser> GetUserList() =>
            _context.Users.Where(u => !u.Groups.Any()).ToAsyncEnumerable(); // TODO: Not Role teacher Maybe move to seperate controller.

        [AllowAnonymous]
        public async Task<IEnumerable<ScheduleSegment>> GetSchedule(string id)
        {
            Group group = await _context.Groups
                .Include(g => g.Courses)
                    .ThenInclude(c => c.Lessons)
                    .Where(g => g.Id == id).FirstOrDefaultAsync();

            return group.Schedule();
        }
    }
}
