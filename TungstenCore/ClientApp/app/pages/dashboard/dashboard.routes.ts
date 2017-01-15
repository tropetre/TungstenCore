import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Pages
// Home Pages
import { HomePage } from './pages/home/homepage.component';
import { TeacherHomePage } from './pages/home/teacher/teacher.component';
import { StudentHomePage } from './pages/home/student/student.component';
//import { HomePage } from './pages/home/admin/admin.component';

//  Other Pages
import { Dashboard_Index } from './dashboard.component';
import { GroupsPage } from './pages/groups/groups.component';
import { GroupPage } from './pages/group/group.component';
import { CoursePage } from './pages/course/course.component';
import { AddParticipantPage } from './pages/addparticipant/addparticipant.component';
import { AssignmentPage } from './pages/assignment/assignment.component';
import { LessonPage } from './pages/lesson/lesson.component';
import { SegmentPage } from './pages/segment/segment.component';

// Create Pages
import { CreateGroup } from './pages/create/creategroup/creategroup.component';
import { CreateCourse } from './pages/create/createcourse/createcourse.component';
import { CreateParticipantPage } from './pages/create/createparticipant/createparticipant.component';
import { CreateLessonPage } from './pages/create/createlesson/createlesson.component';
import { CreateSegmentPage } from './pages/create/createsegment/createsegment.component';
import { CreateAssignmentPage } from './pages/create/createassignment/createassignment.component';

// Edit Pages
import { EditGroupPage } from './pages/edit/editgroup/editgroup.component';
import { EditAssignmentPage } from './pages/edit/editassignment/editassignment.component';
import { EditCoursePage } from './pages/edit/editcourse/editcourse.component';
import { EditLessonPage } from './pages/edit/editlesson/editlesson.component';
import { EditParticipantPage } from './pages/edit/editparticipant/editparticipant.component';
import { EditSegmentPage } from './pages/edit/editsegment/editsegment.component';

// Delete Pages
import { RemoveCoursePage } from './pages/delete/removecourse/removecourse.component';
import { RemoveGroupPage } from './pages/delete/removegroup/removegroup.component';
import { RemoveAssignmentPage } from './pages/delete/removeassignment/removeassignment.component';
import { RemoveLessonPage } from './pages/delete/removelesson/removelesson.component';
import { RemoveParticipantPage } from './pages/delete/removeparticipant/removeparticipant.component';
import { RemoveSegmentPage } from './pages/delete/removesegment/removesegment.component';




// Routing Guards
import { isAuthenticatedGuard } from '../../services/guards/isAuthenticated';
import { isProperRoleGuard } from '../../services/guards/isproperrole';

// Resolvers
// resolvers
import { homepageresolver } from '../../services/resolvers/homepageresolver';

import { userresolver } from '../../services/resolvers/userresolver';
import { usersresolver } from '../../services/resolvers/usersresolver';

import { GroupResolver } from '../../services/resolvers/groupresolver';
import { GroupsResolver } from '../../services/resolvers/groupsresolver';

import { CourseResolver } from '../../services/resolvers/courseresolver';
import { CoursesResolver } from '../../services/resolvers/courses.resolver';

import { LessonResolver } from '../../services/resolvers/lesson.resolver';
import { LessonsResolver } from '../../services/resolvers/lessons.resolver';

import { SegmentResolver } from '../../services/resolvers/segment.resolver';
import { SegmentsResolver } from '../../services/resolvers/segments.resolver';

import { AssignmentResolver } from '../../services/resolvers/assignment.resolver';
import { AssignmentsResolver } from '../../services/resolvers/assignments.resolver';


// Note:
// implement is teacherguard, ( problem adding canActivate on a child )
const routes: Routes = [
    {
        path: '', component: Dashboard_Index, canActivateChild: [isProperRoleGuard], canActivate: [isAuthenticatedGuard],
        resolve: { user: userresolver },
        children:
        [
            { path: 'student', component: StudentHomePage, resolve: { user: userresolver, pageModel: homepageresolver } },
            { path: 'teacher', component: TeacherHomePage, resolve: { user: userresolver, pageModel: homepageresolver } },
            { path: 'admin', component: HomePage },
            { path: 'groups', component: GroupsPage, resolve: { user: userresolver } },
            { path: 'group/:id', component: GroupPage, resolve: { user: userresolver, group: GroupResolver } },
            { path: 'course', component: CoursePage, resolve: { courses: CoursesResolver } },
            { path: 'course/:id', component: CoursePage, resolve: { course: CourseResolver } },
            { path: 'assignment', component: AssignmentPage/*, resolve: { assignments: AssignmentsResolver } */},
            { path: 'assignment/:id', component: AssignmentPage/*, resolve: { assignment: AssignmentResolver } */},
            { path: 'lesson', component: LessonPage, resolve: { lessons: LessonsResolver } },
            { path: 'lesson/:id', component: LessonPage, resolve: { lesson: LessonResolver } },
            { path: 'segment', component: SegmentPage, resolve: { segments: SegmentsResolver } },
            { path: 'segment/:id', component: SegmentPage, resolve: { segment: SegmentResolver } },

            // Create Routes
            { path: 'createparticipant', component: CreateParticipantPage, resolve: { groups: GroupsResolver } },
            { path: 'addparticipant/:id', component: AddParticipantPage, resolve: { users: usersresolver, group: GroupResolver } },
            { path: 'creategroup', component: CreateGroup, resolve: { user: userresolver } },

            { path: 'createcourse', component: CreateCourse, resolve: { groups: GroupsResolver } },
            { path: 'createcourse/:id', component: CreateCourse },

            { path: 'createassignment', component: CreateAssignmentPage, resolve: { segments: SegmentsResolver } },
            { path: 'createassignment/:id', component: CreateAssignmentPage },

            { path: 'createlesson', component: CreateLessonPage, resolve: { courses: CoursesResolver } },
            { path: 'createlesson/:id', component: CreateLessonPage },

            { path: 'createsegment', component: CreateSegmentPage, resolve: { courses: CoursesResolver } },
            { path: 'createsegment/:id', component: CreateSegmentPage },

            // Edit Routes
            { path: 'editgroup', component: EditGroupPage, resolve: { user: userresolver, groups: GroupsResolver } },
            { path: 'editgroup/:id', component: EditGroupPage, resolve: { user: userresolver, group: GroupResolver } },

            { path: 'editcourse', component: EditCoursePage, resolve: { courses: CoursesResolver, groups: GroupsResolver } },
            { path: 'editcourse/:id', component: EditCoursePage, resolve: { course: CourseResolver, groups: GroupsResolver } },

            { path: 'editassignment', component: EditAssignmentPage, resolve: { assignments: AssignmentsResolver, segments: SegmentsResolver} },
            { path: 'editassignment/:id', component: EditAssignmentPage, resolve: { assignment: AssignmentResolver, segments: SegmentsResolver } },

            { path: 'editlesson', component: EditLessonPage, resolve: { lessons: LessonsResolver, courses: CoursesResolver } },
            { path: 'editlesson/:id', component: EditLessonPage, resolve: { lesson: LessonResolver, courses: CoursesResolver } },

            { path: 'editparticipant', component: EditParticipantPage, resolve: { users: usersresolver, groups: GroupsResolver } },
            { path: 'editparticipant/:id', component: EditParticipantPage, resolve: { user: userresolver, groups: GroupsResolver } },

            { path: 'editsegment', component: EditSegmentPage, resolve: { segments: SegmentsResolver, courses: CoursesResolver } },
            { path: 'editsegment/:id', component: EditSegmentPage, resolve: { segment: SegmentResolver, courses: CoursesResolver } },

            // Delete Routes
            { path: 'removegroup', component: RemoveGroupPage, resolve: { user: userresolver, groups: GroupsResolver } },
            { path: 'removegroup/:id', component: RemoveGroupPage, resolve: { user: userresolver, group: GroupResolver } },

            { path: 'removecourse', component: RemoveCoursePage, resolve: { courses: CoursesResolver } },
            { path: 'removecourse/:id', component: RemoveCoursePage, resolve: { course: CourseResolver } },

            { path: 'removeparticipant', component: RemoveParticipantPage, resolve: { users: userresolver, groups: GroupsResolver } },
            { path: 'removeparticipant/:id', component: RemoveParticipantPage, resolve: { user: userresolver, groups: GroupsResolver } },

            { path: 'removeassignment', component: RemoveAssignmentPage, resolve: { assignments: AssignmentsResolver } },
            { path: 'removeassignment/:id', component: RemoveAssignmentPage, resolve: { assignment: AssignmentResolver } },

            { path: 'removelesson', component: RemoveLessonPage, resolve: { lessons: LessonsResolver } },
            { path: 'removelesson/:id', component: RemoveLessonPage, resolve: { lesson: LessonResolver } },

            { path: 'removesegment', component: RemoveSegmentPage, resolve: { segments: SegmentsResolver } },
            { path: 'removesegment/:id', component: RemoveSegmentPage, resolve: { segment: SegmentResolver } },
        ]
    }
];

export const DASHBOARD_Routes: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }

