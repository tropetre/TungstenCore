using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TungstenCore.Models
{
    using JoinModels;

    public class Course : Entity<string>
    {
        /// <summary>
        /// The Id-property is by default a GUID as string
        /// </summary>
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        /// <summary>
        /// Description of the course.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// The Course's Subject.
        /// </summary>
        [Required]
        public string Subject { get; set; }

        /// <summary>
        /// The Course's Level.
        /// </summary>
        public string Level { get; set; }

        /// <summary>
        /// Foreign key for the Course's Group
        /// </summary>
        [Required, ForeignKey("Group")]
        public string GroupId { get; set; }

        /// <summary>
        /// Navigational property to the associated Group
        /// </summary>
        public virtual Group Group { get; set; }

        /// <summary>
        /// Navigational property for the Course's Segments
        /// </summary>
        public virtual ICollection<Segment> Segments { get; set; } = new List<Segment>();

        /// <summary>
        /// Navigational property for the Course's Participants. 
        /// Note that this includes both students and teachers.
        /// </summary>
        public virtual ICollection<ApplicationUserCourse> Participants { get; set; } = new List<ApplicationUserCourse>();

        /// <summary>
        /// Navigational property for Lessons used when Generating Schedules 
        /// </summary>
        public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();

        public override string ToString() => Subject + " " + Level;
    }
}