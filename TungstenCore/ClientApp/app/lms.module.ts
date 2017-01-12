import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
//import { HttpModule } from '@angular/http';


import 'rxjs/Rx';

// Routes
import { RoutingModule } from './lms.routes';

// Interfaces
import { IGroup } from './interfaces/Group';

// classes
import { Group } from './classes/Group';

// Services
import { GroupService } from './services/GroupService';
import { DataService } from './services/data.service';
import { MembershipService } from './services/membership.service';
import { AccountService } from './services/account.service';
import { UserAnnouncer } from './services/UserAnnouncer';
import { WindowSize } from './services/windowsize';

// Components
import { Login } from './components/Login/Login';
import { DropdownBox } from './components/dropdownbox/dropdownbox';
//import { course } from './components/course/course.component';

// Pages
import { IndexPage } from './lms.component';
import { AccountPage } from './pages/account/AccountPage.component';
import { HomePage } from './pages/home/HomePage.component';
import { RegisterPage } from './pages/register/register.component';

// directives
import { Autofocus } from './directives/autofocus';

// Routing Guards
import { isAuthenticatedGuard } from './services/guards/isAuthenticated';
import { isProperRoleGuard } from './services/guards/isproperrole';

// Resolvers
import { userresolver } from './services/resolvers/userresolver';
import { isloggedin } from './services/resolvers/isloggedin';
import { usersresolver } from './services/resolvers/usersresolver';
import { GroupsResolver } from './services/resolvers/groupsresolver';


@NgModule({
    imports: [
        UniversalModule,
//        BrowserModule,
        FormsModule,
//        HttpModule,
        RoutingModule
    ],
    declarations: [
        IndexPage,
        HomePage,
        AccountPage,
        RegisterPage,
        Login,
        Autofocus
    ],
    bootstrap: [IndexPage],
    providers: [
        WindowSize,
        UserAnnouncer,
        GroupService,
        DataService,
        MembershipService,
        isAuthenticatedGuard,
        AccountService,
        userresolver,
        isloggedin,
        usersresolver,
        GroupsResolver,
        isProperRoleGuard
    ]
})
export class AppModule { }