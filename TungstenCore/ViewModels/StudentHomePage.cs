namespace TungstenCore.ViewModels
{
    using System.Collections.Generic;
    using Models;

    public class StudentHomePage
    {
        public IEnumerable<Group> Groups;
        public IEnumerable<Assignment> Assignments;
        public IEnumerable<ScheduleSegment> Schedule;
        public IEnumerable<Course> Courses;
    }
}