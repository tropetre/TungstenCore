using System.ComponentModel.DataAnnotations;

namespace TungstenCore.Models.JoinModels
{
    public class ApplicationUserCourse
    {
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        
        public string CourseId { get; set; }
        public Course Course { get; set; }
    }
}
