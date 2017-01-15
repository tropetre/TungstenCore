using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TungstenCore.Controllers
{
    using ViewModels;
    using DataAccess;
    using Models;
    using ViewModels.Wrappers;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using System.Net.Http;
    using System.IO;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Hosting;

    [Authorize]
    public class FileController : Controller // TODO: Use Viewmodels to minimize exposed data.
    {
        private const string teacherOrAdmin = "Teacher,Admin";
        private readonly ISchoolRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private string currentUserId => _userManager.GetUserId(HttpContext.User);
        private readonly IHostingEnvironment env;

        public FileController(
            ISchoolRepository repository,
            UserManager<ApplicationUser> userManager,
            IHostingEnvironment env)
        {
            _repository = repository;
            _userManager = userManager;
            this.env = env;
        }
        //file/Upload

        [HttpPost]
        public async Task<ActionResult> Upload([FromForm] IFormFileCollection f)
        {
            if (f.Count > 0)
            {
                var targetDirectory = Path.Combine(env.WebRootPath, string.Format("Uploads\\Assignments\\" + currentUserId));
                FileDetail file;
                var fileName = f[0].FileName;
                var savePath = Path.Combine(targetDirectory, fileName);

                using (var fileStream = System.IO.File.Create(savePath))
                {
                    await f[0].CopyToAsync(fileStream);
                    file = await _repository.Savefile(new FileDetail { Extension = f[0].ContentType, FileName = f[0].FileName, OwnerId = currentUserId });
                }

                return Json(new { Status = "Ok" });
            }
            return Json(new { Status = "Error" });
        }

        [HttpPost]
        public async Task<FileContentResult> Getfile([FromBody] FileDetail filedetail)
        {
            filedetail = await _repository.Getfile(filedetail.FilePathId);
            
            var targetDirectory = Path.Combine(env.WebRootPath, string.Format("Uploads\\Assignments\\" + currentUserId));
            var filepath = Path.Combine(targetDirectory, filedetail.FileName + filedetail.FileType);

            var fileContents = System.IO.File.ReadAllBytes(filepath);
            return new FileContentResult(fileContents, "application/octet-stream");
        }

        [HttpPost]
        public IQueryable<FileDetail> Getfiles() =>
            _repository.Getfiles(currentUserId);


    }
}
