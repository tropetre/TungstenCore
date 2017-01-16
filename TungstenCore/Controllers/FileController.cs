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
        public async Task<List<FileDetail>> Upload()
        {
            List<FileDetail> fileDetails = new List<FileDetail>();
            int count = Request.Form.Files.Count;
            var req = await Request.ReadFormAsync();
            for (int i = 0; i < count; i++)
            {
                var file = req.Files[i];

                if (file != null && file.Length > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    FileDetail FileDetail = await _repository.Savefile(new FileDetail
                    {
                        Extension = Path.GetExtension(fileName),
                        FileName = fileName,
                        OwnerId = currentUserId
                    });
                    
                    var path = Path.Combine(env.ContentRootPath, "\\Uploads\\" + currentUserId + "\\" + FileDetail.FilePathId + FileDetail.Extension);


                    using (var fileStream = System.IO.File.Create(path))
                    {
                        await file.CopyToAsync(fileStream);
                        fileDetails.Add(FileDetail);
                    }

                    return fileDetails;
                }
            }
            return fileDetails;
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
