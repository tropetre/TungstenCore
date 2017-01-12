namespace TungstenCore.Controllers
{
    using System.Collections.Generic;
    using Models;

    public class HomePageViewModel
    {
        public IEnumerable<Group> Groups { get; set; }
        public IEnumerable<Assignment> Assignments { get; set; }
        public IEnumerable<Course> Courses { get; set; }
    }
}