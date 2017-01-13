using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TungstenCore.Models;

namespace TungstenCore.DataAccess
{
    public interface ISchoolRepository
    {
        Task<ApplicationUser> GetAttachedUserAsync(string userId);
        IQueryable<ApplicationUser> GetNotAssignedUsers();
        Task<Group> GetGroupWithLessonsAsync(string id);
        Group CreateGroup(Group group);
        Group EditGroup(Group group);
        Task<IEnumerable<Group>> GetGroupsForUserAsync(string userId);
        Task<bool> AddUserToGroupAsync(string userId, string groupId);
        Task<bool> RemoveUserFromGroupAsync(string userId, string groupId);
    }
}
