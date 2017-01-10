import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { MembershipService } from '../membership.service';

@Injectable()
export class isProperRoleGuard implements CanActivateChild {
    constructor( @Inject(MembershipService) private _membershipService: MembershipService,
        @Inject(Router) private router: Router
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentroute = route.routeConfig.path;

        if (this.getproperRoutes(this._membershipService.getLoggedInUser().Roles[0].toLowerCase()).indexOf(currentroute) != -1) {
            //console.log('should gain access to route because he is in proper role');
            return true;
        } else {
            this.router.navigateByUrl('');
            return false;
        }
    }

    getproperRoutes(role: string) {
        let routes = [];

        routes['student'] = ['dashboard', 'student', 'assignments', 'groups', 'group/:id', 'course/:courseid'];
        routes['teacher'] = ['dashboard', 'teacher', 'assignments', 'groups', 'group/:id', 'editgroup/:id', 'removegroup/:id', 'creategroup', 'createcourse/:groupid', 'course/:courseid', 'addparticipant/:id'];
        routes['admin'] = ['dashboard', 'teacher', 'assignments', 'groups', 'group/:id', 'editgroup/:id', 'removegroup/:id', 'creategroup', 'createcourse/:groupid', 'course/:courseid'];

        return routes[role];
    }
}