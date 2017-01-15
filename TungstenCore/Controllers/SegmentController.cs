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
    public class SegmentController : Controller
    {
        private const string teacherOrAdmin = "Teacher,Admin";
        private readonly ISchoolRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private string currentUserId => _userManager.GetUserId(HttpContext.User);

        public SegmentController(
            ISchoolRepository repository,
            UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        public IQueryable<Segment> GetAll() =>
            _repository.GetSegmentsForUser(currentUserId);

        [HttpPost]
        public async Task<Segment> GetById([FromBody] IdWrapper wrapper) =>
            await _repository.GetSegmentByIdAsync(wrapper.Id);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Segment Create([FromBody] Segment segment) =>
            _repository.CreateSegment(segment);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Segment Edit([FromBody] Segment segment) =>
            _repository.EditSegment(segment);

        [HttpPost]
        [Authorize(Roles = teacherOrAdmin)]
        public Segment Delete([FromBody] Segment segment) =>
            _repository.DeleteSegment(segment);
    }
}
