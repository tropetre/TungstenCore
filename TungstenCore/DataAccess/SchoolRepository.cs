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
    public class SchoolRepository : ISchoolRepository
    {
        private ApplicationDbContext _context;

        public SchoolRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private IIncludableQueryable<ApplicationUser, dynamic> UsersWithIncludedProperties()
        {
            return _context.Users
                .Include(user => user.Groups)
                    .ThenInclude(userGroup => userGroup.Group)
                        .ThenInclude(group => group.Courses)
                            .ThenInclude(group => group.Lessons)
                .Include(user => user.Groups)
                    .ThenInclude(userGroup => userGroup.Group)
                        .ThenInclude(group => group.Courses)
                        .ThenInclude(group => group.Segments)
                            .ThenInclude(segment => segment.Assignments)
                .Include(user => user.Groups)
                    .ThenInclude(userGroup => userGroup.Group)
                        .ThenInclude(group => group.Participants)
                            .ThenInclude(ag => ag.ApplicationUser)
                                .ThenInclude(g => g.FilePaths);

        }

        public async Task<ApplicationUser> GetAttachedUserAsync(string userId) =>
            await UsersWithIncludedProperties().SingleOrDefaultAsync(u => u.Id == userId);


        public IQueryable<ApplicationUser> GetNotAssignedUsers() =>
            _context.Users.Where(u => !u.Groups.Any());

        public Task<Group> GetGroupWithLessonsAsync(string groupId) =>
            _context.Groups
                .Include(group => group.Participants)
                    .ThenInclude(ag => ag.ApplicationUser)
                .Include(group => group.Courses)
                    .ThenInclude(course => course.Lessons)
                        .SingleOrDefaultAsync(group => group.Id == groupId);




        public IQueryable<ApplicationUser> GetAllUsers() =>
            _context.Users;

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

        public async Task<IEnumerable<Group>> GetGroupsForUser(string userId) =>
            (await GetAttachedUserAsync(userId)).Groups.Select(g => g.Group);
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
        public async Task<IEnumerable<Course>> GetCoursesForUser(string userId) =>
            (await GetGroupsForUser(userId)).SelectMany(c => c.Courses);

        public async Task<Course> GetCourseByIdAsync(string Id) =>
            (await _context.Courses.Where(c => c.Id == Id).Include(c => c.Segments).Include(c => c.Lessons).Include(c => c.Participants).FirstOrDefaultAsync());

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
        public async Task<IEnumerable<Segment>> GetSegmentsForUser(string userId) =>
            (await GetAttachedUserAsync(userId)).Groups.Select(g => g.Group).SelectMany(gr => gr.Courses).SelectMany(c => c.Segments);

        public async Task<Segment> GetSegmentByIdAsync(string Id) =>
            (await _context.Segments.SingleOrDefaultAsync(s => s.Id == Id));

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
        public async Task<IEnumerable<Assignment>> GetAssignmentsForUser(string userId) =>
            (await GetAttachedUserAsync(userId)).Groups.Select(g => g.Group).SelectMany(gr => gr.Courses).SelectMany(c => c.Segments).SelectMany(s => s.Assignments);

        public async Task<Assignment> GetAssignmentByIdAsync(string Id) =>
            (await _context.Assignments.Where(a => a.Id == Id).FirstOrDefaultAsync());


        public Assignment CreateAssignment(Assignment assignment)
        {
            _context.Set<Assignment>().Add(assignment);
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
        public async Task<IEnumerable<Lesson>> GetLessonsForUser(string userId) =>
            (await GetAttachedUserAsync(userId)).Groups.Select(g => g.Group).SelectMany(gr => gr.Courses).SelectMany(c => c.Lessons);

        public async Task<Lesson> GetLessonByIdAsync(string Id) =>
            (await _context.Lessons.Where(l => l.Id == Id).FirstOrDefaultAsync());

        public async Task<Lesson> CreateLesson(Lesson lesson) //TODO: Check what's up.
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

        // File
        public async Task<File> UploadFile(File file)
        {
            await _context.Files.AddAsync(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<FileDetail> Savefile(FileDetail file)
        {
            //file.Owner = await _context.Users.FindAsync(file.OwnerId);
            //file.Assignment = await _context.Assignments.FindAsync(file.AssignmentId);
            await _context.FilePaths.AddAsync(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<File> Getfile(string Id) =>
            await _context.Files.FindAsync(Id);

        public async Task<FileDetail> GetfileDetail(string id) =>
            await _context.FilePaths.FindAsync(id);

        public IQueryable<FileDetail> Getfiles(string userId) =>
           _context.FilePaths.Where(f => f.OwnerId == userId);

        public async Task<IQueryable<FileDetail>> GetGroupFiles(string currentUserId) =>
            (await GetAttachedUserAsync(currentUserId))
            .Groups.Select(g => g.Group)
                .SelectMany(p => p.Participants.Select(pa => pa.ApplicationUser))
                    .SelectMany(p => p.FilePaths).Where(f => f.AssignmentId == null).AsQueryable();
    }
}
