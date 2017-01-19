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
                    var dbfile = new Models.File { Content = new byte[file.Length] };
                    await file.OpenReadStream().ReadAsync(dbfile.Content, 0, dbfile.Content.Length);
                    await _repository.UploadFile(dbfile);

                    var fileName = Path.GetFileName(file.FileName);
                    filedetail.Extension = Path.GetExtension(fileName);
                    filedetail.FileName = fileName;
                    filedetail.OwnerId = currentUserId;
                    if(!string.IsNullOrEmpty(assignmentid))
                        filedetail.AssignmentId = assignmentid;
                    filedetail.FileId = dbfile.Id;

                    await _repository.Savefile(filedetail);
                }
            }
            return await _repository.GetfileDetail(filedetail.Id);
        }

        [HttpPost]
        public Task<FileDetail> GetById([FromBody] IdWrapper wrapper) =>
            _repository.GetfileDetail(wrapper.Id);

        [HttpPost]
        public async Task<FileContentResult> Download([FromBody] IdWrapper wrapper) =>
            new FileContentResult((await _repository.Getfile(wrapper.Id)).Content, "application/octet-stream");
        
        public IQueryable<FileDetail> GetAll() =>
            _repository.Getfiles(currentUserId);

        public Task<IQueryable<FileDetail>> GetPublicFiles() =>
            _repository.GetGroupFiles(currentUserId);


    }
}
