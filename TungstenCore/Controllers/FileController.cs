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

        //[HttpPost]
        public async Task<FileDetail> Upload()
        {
            FileDetail filedetail = new FileDetail();
            int count = Request.Form.Files.Count;
            var req = await Request.ReadFormAsync();
            string assignmentid = req["AssignmentId"];
            for (int i = 0; i < count; i++)
            {
                IFormFile file = req.Files[i];

                if (file != null && file.Length > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);

                    filedetail.Extension = Path.GetExtension(fileName);
                    filedetail.FileName = fileName;
                    filedetail.OwnerId = currentUserId;
                    filedetail.AssignmentId = assignmentid;
                    filedetail.File = new byte[file.Length];

                    await file.OpenReadStream().ReadAsync(filedetail.File, 0, filedetail.File.Length);
                    filedetail = await _repository.Savefile(filedetail);
                }
            }
            return filedetail;
        }

        [HttpPost]
        public async Task<FileContentResult> Getfile([FromBody] FileDetail filedetail)
        {
            filedetail = await _repository.Getfile(filedetail.Id);
            
            var targetDirectory = Path.Combine(env.WebRootPath, string.Format("Uploads\\Assignments\\" + currentUserId));
            var filepath = Path.Combine(targetDirectory, filedetail.FileName + filedetail.Extension);

            var fileContents = System.IO.File.ReadAllBytes(filepath);
            return new FileContentResult(fileContents, "application/octet-stream");
        }

        [HttpPost]
        public IQueryable<FileDetail> Getfiles() =>
            _repository.Getfiles(currentUserId);


    }
}
