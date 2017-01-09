namespace TungstenCore.ViewModels
{
    using System.Collections.Generic;
    using Models;
    public class SuperUserHomePage
    {
        public IEnumerable<Assignment> Assignments;
        public IEnumerable<ScheduleSegment> Schedule;
        public IEnumerable<Course> Courses;
    }
}