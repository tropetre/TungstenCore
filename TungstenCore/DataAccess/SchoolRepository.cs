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
        private ApplicationDbContext _context;

        public SchoolRepository(ApplicationDbContext context)
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


        public Task<ApplicationUser> GetAttachedUserAsync(string userId) =>
            _context.Users
                .Include(user => user.Groups)
                    .ThenInclude(userGroup => userGroup.Group)
                        .ThenInclude(group => group.Courses)
                        .ThenInclude(group => group.Segments)
                            .ThenInclude(segment => segment.Assignments)
            .SingleOrDefaultAsync(u => u.Id == userId);


        public IQueryable<ApplicationUser> GetNotAssignedUsers() =>
            _context.Users.Where(u => !u.Groups.Any()).AsNoTracking();

        public Task<Group> GetGroupWithLessonsAsync(string groupId) =>
            _context.Groups
                .Include(group => group.Courses)
                    .ThenInclude(course => course.Lessons)
                        .AsNoTracking()
            .SingleOrDefaultAsync(group => group.Id == groupId);




        public IQueryable<ApplicationUser> GetAllUsers() =>
            _context.Users.AsNoTracking();

        public Group CreateGroup(Group group)
        {
            _context.Groups.Add(group);
            _context.SaveChanges();
            return group;
        }

        public async Task<Group> EditGroup(Group group)
        {
            _context.Groups.Update(group);
            await _context.SaveChangesAsync();
            return group;
        }

        public Group DeleteGroup(Group group)
        {
            _context.Groups.Remove(group);
            _context.SaveChanges();
            return group;
        }

        public IQueryable<Group> GetGroupsForUserAsync(string userId) =>
            _context.Groups.AsNoTracking();
        //(await GetAttachedUserAsync(userId)).Groups.Select(g => g.Group);

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

        // Course
        public async Task<IEnumerable<Course>> GetCoursesForUserAsync(string userId)
        {
            var groups = GetGroupsForUserAsync(userId);
            List<Course> courses = new List<Course>();
            foreach (Group g in groups)
            {
                courses.AddRange(g.Courses);
            }
            return courses;
        }

        public async Task<Course> GetCourseByIdAsync(string Id) =>
            (await _context.Courses.Where(c => c.Id == Id).FirstOrDefaultAsync());

        public Course CreateCourse(Course course)
        {
            _context.Courses.Add(course);
            _context.SaveChanges();
            return course;
        }

        public Course EditCourse(Course course)
        {
            _context.Courses.Update(course);
            _context.SaveChanges();
            return course;
        }

        public Course DeleteCourse(Course course)
        {
            _context.Courses.Remove(course);
            _context.SaveChanges();
            return course;
        }

        // Segments
        public async Task<IEnumerable<Segment>> GetSegmentsForUserAsync(string userId)
        {
            IEnumerable<Course> courses = await GetCoursesForUserAsync(userId);
            List<Segment> segments = new List<Segment>();

            foreach (Course c in courses)
            {
                segments.AddRange(c.Segments);
            }

            return segments;
        }

        public async Task<Segment> GetSegmentByIdAsync(string Id) =>
            (await _context.Segments.Where(s => s.Id == Id).FirstOrDefaultAsync());

        public Segment CreateSegment(Segment segment)
        {
            _context.Segments.Add(segment);
            //segment.Course = _context.Courses.Find(segment.CourseId);
            _context.SaveChanges();
            return segment;
        }

        public Segment EditSegment(Segment segment)
        {
            _context.Segments.Update(segment);
            _context.SaveChanges();
            return segment;
        }

        public Segment DeleteSegment(Segment segment)
        {
            _context.Segments.Remove(segment);
            _context.SaveChanges();
            return segment;
        }

        // Assignments
        public async Task<IEnumerable<Assignment>> GetAssignmentsForUserAsync(string userId)
        {
            IEnumerable<Segment> segments = await GetSegmentsForUserAsync(userId);
            List<Assignment> assignments = new List<Assignment>();

            foreach (Segment s in segments)
            {
                assignments.AddRange(s.Assignments);
            }

            return assignments;
        }

        public async Task<Assignment> GetAssignmentByIdAsync(string Id) =>
            (await _context.Assignments.Where(a => a.Id == Id).FirstOrDefaultAsync());


        public Assignment CreateAssignment(Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            _context.SaveChanges();
            return assignment;
        }

        public Assignment EditAssignment(Assignment assignment)
        {
            _context.Assignments.Update(assignment);
            _context.SaveChanges();
            return assignment;
        }

        public Assignment DeleteAssignment(Assignment assignment)
        {
            _context.Assignments.Remove(assignment);
            _context.SaveChanges();
            return assignment;
        }

        // Lessons
        public async Task<IEnumerable<Lesson>> GetLessonsForUserAsync(string userId)
        {
            IEnumerable<Course> courses = await GetCoursesForUserAsync(userId);
            List<Lesson> lessons = new List<Lesson>();

            foreach (Course c in courses)
            {
                lessons.AddRange(c.Lessons);
            }

            return lessons;
        }

        public async Task<Lesson> GetLessonByIdAsync(string Id) =>
            (await _context.Lessons.Where(l => l.Id == Id).FirstOrDefaultAsync());

        public async Task<Lesson> CreateLesson(Lesson lesson)
        {
            Course course = await _context.Courses.FindAsync(lesson.CourseId);
            await _context.Lessons.AddAsync(lesson);
            lesson.Course = _context.Courses.Find(lesson.CourseId);
            course.Lessons.Add(lesson);
            _context.SaveChanges();
            return lesson;
        }

        public Lesson EditLesson(Lesson lesson)
        {
            _context.Lessons.Update(lesson);
            _context.SaveChanges();
            return lesson;
        }

        public Lesson DeleteLesson(Lesson lesson)
        {
            _context.Lessons.Remove(lesson);
            _context.SaveChanges();
            return lesson;
        }
    }
}
