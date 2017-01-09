namespace TungstenCore.DataAccess
{
    using Microsoft.EntityFrameworkCore;
    using Models;

    public interface ISchoolContext
    {
        DbSet<Group> Groups { get; set; }
        DbSet<Course> Courses { get; set; }
        DbSet<Segment> Segments { get; set; }
        DbSet<Assignment> Assignments { get; set; }
        DbSet<Lesson> Lessons { get; set; }
        DbSet<FilePath> FilePaths { get; set; }
        int SaveChanges();
    }
}