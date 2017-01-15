using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TungstenCore.Controllers
{
    using DataAccess;
    using Models;
    using System.Linq;
    using ViewModels.Wrappers;

    [Authorize]
    public class AssignmentController : Controller // TODO: Use Viewmodels to minimize exposed data.
    {
        private const string teacherOrAdmin = "Teacher,Admin";
        private readonly ISchoolRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private string currentUserId => _userManager.GetUserId(HttpContext.User);

        public AssignmentController(
            ISchoolRepository repository,
            UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        public IQueryable<Assignment> GetAll() =>
            _repository.GetAssignmentsForUser(currentUserId);

        [HttpPost]
        public async Task<Assignment> GetById([FromBody] IdWrapper wrapper) =>
            await _repository.GetAssignmentByIdAsync(wrapper.Id);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Assignment Create([FromBody] Assignment assignment) =>
            _repository.CreateAssignment(assignment);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Assignment Edit([FromBody] Assignment assignment) =>
            _repository.EditAssignment(assignment);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Assignment Delete([FromBody] Assignment assignment) =>
            _repository.DeleteAssignment(assignment);

    }
}
