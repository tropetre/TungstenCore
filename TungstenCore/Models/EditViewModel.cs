using System.ComponentModel.DataAnnotations;

namespace TungstenCore.Models
{
    public class EditViewModel
    {
        //[Required]
        //public string UserId { get; set; }

        [Required]
        public string OldPassword { get; set; }

        public string NewPassword { get; set; }

        public string NewPasswordConfirm { get; set; }

        public string Username { get; set; }

        [EmailAddress]
        public string Email { get; set; }
    }
}