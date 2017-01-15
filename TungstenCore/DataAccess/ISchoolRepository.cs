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
        IQueryable<ApplicationUser> GetAllUsers();
        Task<Group> GetGroupWithLessonsAsync(string id);
        Group CreateGroup(Group group);
        Task<Group> EditGroup(Group group);
        Group DeleteGroup(Group croup);
        Task<IEnumerable<Group>> GetGroupsForUserAsync(string userId);
        Task<bool> AddUserToGroupAsync(string userId, string groupId);
        Task<bool> RemoveUserFromGroupAsync(string userId, string groupId);

        Task<IEnumerable<Course>> GetCoursesForUserAsync(string userId);
        Task<Course> GetCourseByIdAsync(string id);
        Course CreateCourse(Course course);
        Course EditCourse(Course course);
        Course DeleteCourse(Course course);

        Task<IEnumerable<Segment>> GetSegmentsForUserAsync(string userId);
        Task<Segment> GetSegmentByIdAsync(string Id);
        Segment CreateSegment(Segment segment);
        Segment EditSegment(Segment segment);
        Segment DeleteSegment(Segment segment);

        Task<IEnumerable<Assignment>> GetAssignmentsForUserAsync(string userId);
        Task<Assignment> GetAssignmentByIdAsync(string Id);
        Assignment CreateAssignment(Assignment assignment);
        Assignment EditAssignment(Assignment assignment);
        Assignment DeleteAssignment(Assignment assignment);

        Task<IEnumerable<Lesson>> GetLessonsForUserAsync(string userId);
        Task<Lesson> GetLessonByIdAsync(string Id);
        Task<Lesson> CreateLesson(Lesson lesson);
        Lesson EditLesson(Lesson lesson);
        Lesson DeleteLesson(Lesson lesson);

    }
}
