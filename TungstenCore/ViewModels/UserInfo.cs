using System.Collections.Generic;
using TungstenCore.Models;

namespace TungstenCore.ViewModels
{
    public class UserInfo
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public ICollection<string> Roles { get; set; }
    }
}
