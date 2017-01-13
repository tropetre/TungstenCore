using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TungstenCore.ViewModels;
using TungstenCore.DataAccess;
using TungstenCore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TungstenCore.Controllers
{
    [Authorize]
    public class GroupController : Controller // TODO: Use Viewmodels to minimize exposed data.
    {
        private const string teacherOrAdmin = "Teacher,Admin";
        private readonly ISchoolRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private string currentUserId => _userManager.GetUserId(HttpContext.User);

        public GroupController(
            ISchoolRepository repository,
            UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        public async Task<IEnumerable<ScheduleSegment>> GetSchedule(string id) =>
            (await _repository.GetGroupWithLessonsAsync(id)).Schedule();

        public async Task<IEnumerable<Group>> GetGroups() =>
            await _repository.GetGroupsForUserAsync(currentUserId);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Group CreateGroup(Group group) =>
            _repository.CreateGroup(group);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Group EditGroup(Group group) =>
            _repository.EditGroup(group);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public async Task<ResultObject> AddUserToGroup(string userId, string groupId) =>
            new ResultObject(await _repository.AddUserToGroupAsync(userId, groupId));

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public async Task<ResultObject> RemoveUserFromGroup(string userId, string groupId) =>
            new ResultObject(await _repository.RemoveUserFromGroupAsync(userId, groupId));

    }
}
