using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TungstenCore.Models;

namespace TungstenCore.DataAccess
{
    public class SchoolRepository : ISchoolRepository, IDisposable
    {
        private ISchoolContext _context;

        public SchoolRepository(ISchoolContext context)
        {
            _context = context;
        }

        private IIncludableQueryable<ApplicationUser, ICollection<Assignment>> UsersWithIncludedProperties()
        {
            return _context.Users
                .Include(user => user.Groups)
                    .ThenInclude(userGroup => userGroup.Group)
                        .ThenInclude(group => group.Courses)
                        .ThenInclude(group => group.Segments)
                            .ThenInclude(segment => segment.Assignments);
        }

        public async Task<ApplicationUser> GetAttachedUser(ApplicationUser user) =>
            await UsersWithIncludedProperties().Where(u => u.Id == user.Id).FirstOrDefaultAsync();


        public IQueryable<ApplicationUser> GetNotAssignedUsers() =>
            _context.Users.Where(u => !u.Groups.Any());

        public Task<Group> GetGroupWithLessons(string id) =>
            _context.Groups
                .Include(g => g.Courses)
                    .ThenInclude(c => c.Lessons)
                    .Where(g => g.Id == id).FirstOrDefaultAsync();

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

    }
}
