using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TungstenCore.Controllers
{
    using DataAccess;
    using Models;
    using ViewModels;

    [Authorize]
    public class HomeController : Controller
    {
        private ISchoolRepository _repository;

        public HomeController(ISchoolRepository repository)
        {
            _repository = repository;
        }

        [AllowAnonymous]
        public IActionResult Index() => View();

        public IAsyncEnumerable<ApplicationUser> GetUserList() =>
            _repository.GetNotAssignedUsers().ToAsyncEnumerable(); // TODO: Not Role teacher Maybe move to seperate controller.
        
        public async Task<IEnumerable<ScheduleSegment>> GetSchedule(string id) =>
            (await _repository.GetGroupWithLessons(id)).Schedule();
    }
}
