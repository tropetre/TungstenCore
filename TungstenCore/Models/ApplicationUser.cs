using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TungstenCore.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string Name { get; set; }

        [RegularExpression("^([0-9]{6}([-+]).*)$")]
        public string SSN { get; set; }

        public string Address { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
        public virtual ICollection<FilePath> FilePaths { get; set; }
    }
}