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
    public class CourseController : Controller
    {
        private const string teacherOrAdmin = "Teacher,Admin";
        private readonly ISchoolRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private string currentUserId => _userManager.GetUserId(HttpContext.User);

        public CourseController(
            ISchoolRepository repository,
            UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        public async Task<IEnumerable<Course>> GetAll() =>
            await _repository.GetCoursesForUser(currentUserId);

        [HttpPost]
        public async Task<Course> GetById([FromBody] IdWrapper wrapper) =>
            await _repository.GetCourseByIdAsync(wrapper.Id);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Course Create([FromBody] Course course) =>
            _repository.CreateCourse(course);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Course Edit([FromBody] Course course) =>
            _repository.EditCourse(course);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Course Delete([FromBody] Course course) =>
            _repository.DeleteCourse(course);
    }
}
