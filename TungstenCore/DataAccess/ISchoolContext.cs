namespace TungstenCore.DataAccess
{
    using Microsoft.EntityFrameworkCore;
    using Models;
    using System.Threading;
    using System.Threading.Tasks;

    public interface ISchoolContext
    {
        DbSet<Group> Groups { get; set; }
        DbSet<Course> Courses { get; set; }
        DbSet<Segment> Segments { get; set; }
        DbSet<Assignment> Assignments { get; set; }
        DbSet<Lesson> Lessons { get; set; }
        DbSet<FileDetail> FilePaths { get; set; }
        DbSet<ApplicationUser> Users { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}