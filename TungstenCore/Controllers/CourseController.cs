using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TungstenCore.DataAccess;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TungstenCore.Controllers
{
    public class CourseController : Controller
    {
        private readonly ISchoolRepository _repository;

        public CourseController(ISchoolRepository repository)
        {
            _repository = repository;
        }
    }
}
