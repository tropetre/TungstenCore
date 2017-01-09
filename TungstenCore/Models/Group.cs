using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TungstenCore.Models
{
    using JoinModels;
    using ViewModels;

    /// <summary>
    /// The Group class represents a collection of users, such as a class of students.
    /// </summary>
    public class Group : Entity<string>
    {
        /// <summary>
        /// The Id-property is by default a GUID as string
        /// </summary>
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        /// <summary>
        /// Name of the Group, e.g. "5B" for the B-class of year 5 students
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// The Description property can be used as a catch-all info field for the group.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Navigational property for a Group's participating Users, both Teachers and Studenst
        /// </summary>
        public virtual ICollection<ApplicationUserGroup> Participants { get; set; } = new List<ApplicationUserGroup>();

        /// <summary>
        /// Navigational property for a Group's Courses, e.g. English 1, Math 1, Math 2
        /// </summary>
        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

        /// <summary>
        /// ScheduleSegments for all lessons in a Group
        /// </summary>
        public IEnumerable<ScheduleSegment> Schedule() =>
            from course in Courses
            from lesson in course.Lessons
            orderby lesson.StartTime
            select new ScheduleSegment
            {
                CourseName = course.ToString(),
                Day = lesson.StartTime.DayOfWeek,
                StartTime = lesson.StartTime.TimeOfDay,
                EndTime = lesson.EndTime.TimeOfDay,
                Classroom = lesson.Classroom,
                    // Perhaps implement a predefined list of colors to ensure that the colors are suitable for humans.
                    Color = $"#{(course.ToString().GetHashCode() % 0x1000000):X6}".Substring(0, 7)
            };
    }
}