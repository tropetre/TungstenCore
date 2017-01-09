using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TungstenCore.Models
{
    public class Segment : Entity<string>
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Display(Name = "Namn")]
        public string Name { get; set; }
        [Display(Name = "Beskrivning")]
        public string Description { get; set; }
        
        [Required, ForeignKey("Course")]
        public string CourseId { get; set; }
        public Course Course { get; set; }

        public virtual ICollection<Assignment> Assignments { get; set; }
    }
}