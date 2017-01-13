using Microsoft.AspNetCore.Mvc;

namespace TungstenCore.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();

        // GetUserList Moved to Accounts with the name GetNotAssignedUsers.

        //GetSchedule(id) moved to GroupController. 
    }
}
