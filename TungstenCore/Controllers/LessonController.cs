using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace TungstenCore.Controllers
{
    using DataAccess;
    using Models;
    using System.Linq;
    using ViewModels.Wrappers;
    public class LessonController: Controller
    {
        private const string teacherOrAdmin = "Teacher,Admin";
        private readonly ISchoolRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private string currentUserId => _userManager.GetUserId(HttpContext.User);

        public LessonController(
            ISchoolRepository repository,
            UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        public IQueryable<Lesson> GetAll() =>
            _repository.GetLessonsForUser(currentUserId);

        [HttpPost]
        public async Task<Lesson> GetById([FromBody] IdWrapper wrapper) =>
            await _repository.GetLessonByIdAsync(wrapper.Id);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public async Task<Lesson> Create([FromBody] Lesson lesson) =>
            await _repository.CreateLesson(lesson);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Lesson Edit([FromBody] Lesson lesson) =>
            _repository.EditLesson(lesson);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Lesson Delete([FromBody] Lesson lesson) =>
            _repository.DeleteLesson(lesson);
    }
}
