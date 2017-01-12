import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

// routes
import { DASHBOARD_Routes, DashboardRoutingModule } from './dashboard.routes';

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

// components
import { GroupsList } from '../../components/groupslist/GroupsList';
import { Schedule } from '../../components/Schedule/Schedule';
import { DropdownBox } from '../../components/dropdownbox/dropdownbox';
//import { course } from '../../components/course/course.component';

// services
import { UserAnnouncer } from '../../services/UserAnnouncer';
import { GroupService } from '../../services/groupservice';
import { ScheduleService } from '../../services/schedule.service';
import { CourseService } from '../../services/course.service';
import { MembershipService } from '../../services/membership.service';
import { SegmentService } from '../../services/segment.service';
import { LessonService } from '../../services/lesson.service';
import { AssignmentService } from '../../services/assignment.service';

// routing guards
import { isProperRoleGuard } from '../../services/guards/isproperrole';

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


// Pipes
import { FilterUserByNamePipe } from '../../pipes/filterPipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        DashboardRoutingModule
    ],
    declarations: [
        // Pages
        Dashboard_Index,
        HomePage,
        GroupPage,
        GroupsPage,
        TeacherHomePage,
        StudentHomePage,
        CoursePage,
        AddParticipantPage,

        // Create
        CreateGroup,
        CreateCourse,
        CreateParticipantPage,
        CreateLessonPage,
        CreateSegmentPage,
        CreateAssignmentPage,
        // Edit
        EditGroupPage,
        EditLessonPage,
        EditCoursePage,
        EditAssignmentPage,
        EditParticipantPage,
        EditSegmentPage,
        // Delete
        RemoveGroupPage,
        RemoveCoursePage,
        RemoveLessonPage,
        RemoveParticipantPage,
        RemoveAssignmentPage,
        RemoveSegmentPage,
        // Pages End
        DropdownBox,
        GroupsList,
        Schedule,
        FilterUserByNamePipe
        
    ],
    providers: [
        LessonResolver,
        LessonsResolver,
        SegmentResolver,
        SegmentsResolver,
        AssignmentResolver,
        AssignmentsResolver,
        AssignmentService,
        LessonService,
        SegmentService,
        UserAnnouncer,
        MembershipService,
        GroupService,
        CourseService,
        ScheduleService,
        isProperRoleGuard,
        userresolver,
        homepageresolver,
        GroupResolver,
        CourseResolver,
        GroupsResolver,
        CoursesResolver
    ]
})
export class Dashboard { }