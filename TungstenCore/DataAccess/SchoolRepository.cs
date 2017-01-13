using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TungstenCore.Models;
using TungstenCore.Models.JoinModels;

namespace TungstenCore.DataAccess
{
    public class SchoolRepository : ISchoolRepository, IDisposable
    {
        private ISchoolContext _context;

        public SchoolRepository(ISchoolContext context)
        {
            _context = context;
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~SchoolRepository() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion

        private IIncludableQueryable<ApplicationUser, dynamic> UsersWithIncludedProperties()
        {
            return _context.Users
                .Include(user => user.Groups)
                    .ThenInclude(userGroup => userGroup.Group)
                        .ThenInclude(group => group.Courses)
                        .ThenInclude(group => group.Segments)
                            .ThenInclude(segment => segment.Assignments);
        }

        public async Task<ApplicationUser> GetAttachedUserAsync(ApplicationUser user) =>
            await UsersWithIncludedProperties().Where(u => u.Id == user.Id).FirstOrDefaultAsync();


        public IQueryable<ApplicationUser> GetNotAssignedUsers() =>
            _context.Users.Where(u => !u.Groups.Any()).AsNoTracking();

        public Task<Group> GetGroupWithLessonsAsync(string id) =>
            _context.Groups
                .Include(g => g.Courses)
                    .ThenInclude(c => c.Lessons)
                    .Where(g => g.Id == id)
            .AsNoTracking()
            .FirstOrDefaultAsync();



        public Group CreateGroup(Group group)
        {
            _context.Groups.Add(group);
            _context.SaveChanges();
            return group;
        }

        public Group EditGroup(Group group)
        {
            _context.Groups.Update(group);
            _context.SaveChanges();
            return group;
        }

        public IAsyncEnumerable<Group> GetGroupsForUser(string userId) =>
            UsersWithIncludedProperties().Where(u => u.Id == userId)
            .FirstOrDefault()?.Groups.Select(ag => ag.Group).ToAsyncEnumerable();

        public async Task<bool> AddUserToGroupAsync(string userId, string groupId)
        {
            try
            {
                Group group = await _context.Groups.FindAsync(groupId);
                group.Participants.Add(new ApplicationUserGroup
                {
                    ApplicationUserId = userId,
                    GroupId = groupId
                });
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveUserFromGroupAsync(string userId, string groupId)
        {
            try
            {
                Group group = await _context.Groups.FindAsync(groupId);
                group.Participants.Remove(group.Participants.First(u => u.ApplicationUserId == userId));
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
