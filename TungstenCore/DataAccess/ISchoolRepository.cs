using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TungstenCore.Models;

namespace TungstenCore.DataAccess
{
    public interface ISchoolRepository
    {
        Task<ApplicationUser> GetAttachedUser(ApplicationUser identityUser);
        IQueryable<ApplicationUser> GetNotAssignedUsers();
        Task<Group> GetGroupWithLessons(string id);
    }
}
