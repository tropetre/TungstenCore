using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TungstenCore.Controllers
{
    using DataAccess;
    using Microsoft.AspNetCore.Hosting.Server;
    using Microsoft.AspNetCore.Identity;
    using Models;
    using System.IO;
    using ViewModels;

    [Authorize]
    public class HomeController : Controller
    {
        private ISchoolRepository _repository;
        private IHostingEnvironment _env;
        private readonly UserManager<ApplicationUser> _userManager;

        public HomeController(UserManager<ApplicationUser> userManager, ISchoolRepository repository, IHostingEnvironment env)
        {
            _userManager = userManager;
            _repository = repository;
            _env = env;
        }

        [AllowAnonymous]
        public IActionResult Index() => View();

        public IAsyncEnumerable<ApplicationUser> GetUserList() =>
            _repository.GetNotAssignedUsers().ToAsyncEnumerable(); // TODO: Not Role teacher Maybe move to seperate controller.

        public async Task<IEnumerable<ScheduleSegment>> GetSchedule(string id) =>
            (await _repository.GetGroupWithLessons(id)).Schedule();

        public async Task<object> Upload()
        {
            if (ModelState.IsValid)
            {
                List<FileDetail> fileDetails = new List<FileDetail>();
                for (int i = 0; i < Request.Form.Files.Count; i++)
                {
                    var file = Request.Form.Files[i];

                    if (file != null && file.Length > 0)
                    {
                        var fileName = EnsureCorrectFilename(Path.GetFileName(file.FileName));
                        FileDetail fileDetail = new FileDetail()
                        {
                            FileName = fileName,
                            Extension = Path.GetExtension(fileName),
                            FilePathId = Guid.NewGuid().ToString(),
                            OwnerId = _userManager.GetUserId(User)
                        };
                        fileDetails.Add(fileDetail);

                        using (FileStream filestream = System.IO.File.Create(this.GetPathAndFilename(fileDetail.FilePathId + fileDetail.Extension)))
                        {

                            //var path = Path.Combine(Server.MapPath(ROOT_DIRECTORY), fileDetail.Id + fileDetail.Extension);
                            await file.CopyToAsync(filestream);
                        }
                    }
                }

                //db.FileDetails.AddRange(fileDetails);

                return new { success = true };
            }
            return new { success = false }; ;
        }

        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }

        private string GetPathAndFilename(string filename)
        {
            return _env.WebRootPath + "\\uploads\\" + filename;
        }
    }
}
