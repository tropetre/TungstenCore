using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TungstenCore.Controllers
{
    using ViewModels;
    using DataAccess;
    using Models;
    using ViewModels.Wrappers;

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


        public async Task<IEnumerable<ScheduleSegment>> GetSchedule([FromBody] IdWrapper wrapper) =>
            (await _repository.GetGroupWithLessonsAsync(wrapper.Id)).Schedule();

        public IEnumerable<Group> GetGroups() =>
            _repository.GetGroupsForUserAsync(currentUserId);

        [HttpPost]
        public async Task<Group> GetGroup([FromBody] IdWrapper wrapper) =>
            await _repository.GetGroupWithLessonsAsync(wrapper.Id);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Group CreateGroup([FromBody] Group group) =>
            _repository.CreateGroup(group); // TODO: Insert the teacher into the group.

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public async Task<Group> EditGroup([FromBody] Group group) =>
            await _repository.EditGroup(group);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Group DeleteGroup([FromBody] Group group) =>
            _repository.DeleteGroup(group);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public async Task<ResultObject> AddUserToGroup([FromBody] UserGroupIdWrapper wrapper) =>
            new ResultObject(await _repository.AddUserToGroupAsync(wrapper.UserId, wrapper.GroupId));

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public async Task<ResultObject> RemoveUserFromGroup([FromBody] UserGroupIdWrapper wrapper) =>
            new ResultObject(await _repository.RemoveUserFromGroupAsync(wrapper.UserId, wrapper.GroupId));

    }
}
