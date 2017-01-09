using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TungstenCore.Models
{
    public class Lesson : Entity<string>
    {
        /// <summary>
        /// The Id-property is by default a GUID as string
        /// </summary>
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        /// <summary>
        /// The required foreign key to the related course
        /// </summary>
        [Required, ForeignKey("Course")]
        public string CourseId { get; set; }

        /// <summary>
        /// Navigational Property to the Course
        /// </summary>
        public virtual Course Course { get; set; }

        /// <summary>
        /// Lesson Start Time
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        /// Lesson End Time
        /// </summary>
        public DateTime EndTime { get; set; }


        /// <summary>
        /// The Classroom that the lesson will be held in
        /// </summary>
        public string Classroom { get; set; }
    }
}