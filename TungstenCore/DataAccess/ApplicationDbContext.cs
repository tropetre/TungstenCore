using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TungstenCore.DataAccess
{
    using System;
    using Models;
    using Models.JoinModels;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base (options)
        {

        }

        public DbSet<Group> Groups { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Segment> Segments { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<FileDetail> FilePaths { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region ApplicationUserCourse Building
            var applicationUserCourse = modelBuilder.Entity<ApplicationUserCourse>();

            applicationUserCourse
                .HasKey(rel => new { rel.ApplicationUserId, rel.CourseId });

            applicationUserCourse
                .HasOne(rel => rel.Course)
                .WithMany(rel => rel.Participants)
                .HasForeignKey(rel => rel.ApplicationUserId);

            //applicationUserCourse
            //    .HasOne(rel => rel.ApplicationUser)
            //    .WithMany(rel => rel.Courses)
            //    .HasForeignKey(rel => rel.CourseId);
            #endregion

            #region ApplicationUserGroup Building
            var applicationUserGroup = modelBuilder.Entity<ApplicationUserGroup>();

            applicationUserGroup
                .HasKey(rel => new { rel.ApplicationUserId, rel.GroupId });

            applicationUserGroup
                .HasOne(rel => rel.Group)
                .WithMany(rel => rel.Participants)
                .HasForeignKey(rel => rel.ApplicationUserId);

            applicationUserGroup
                .HasOne(rel => rel.ApplicationUser)
                .WithMany(rel => rel.Groups)
                .HasForeignKey(rel => rel.GroupId);
            #endregion

            #region FilePath Building
            var filePath = modelBuilder.Entity<FileDetail>();

            filePath
                .HasOne(rel => rel.Owner)
                .WithMany(rel => rel.FilePaths)
                .HasForeignKey(rel => rel.FilePathId);

            #endregion
        }

        //public System.Data.Entity.DbSet<TungstenCore.Models.ApplicationUser> ApplicationUsers { get; set; }
    }
}