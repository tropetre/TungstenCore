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

        routes['student'] = ['dashboard', 'student', 'assignment', 'assignment/:id', 'group', 'group/:id', 'course/:courseid', 'course'];
        routes['teacher'] = [
            'dashboard',
            'teacher',
            'assignments',
            'groups',
            'group/:id',
            'course/:id',
            'addparticipant/:id',

            // Create
            'creategroup',
            'createparticipant',

            'createcourse',
            'createcourse/:id',
            
            'createassignment',
            'createassignment/:id',

            'createlesson',
            'createlesson/:id',

            'createsegment',
            'createsegment/:id',

            // Edit
            'editgroup',
            'editgroup/:id',

            'editcourse',
            'editcourse/:id',

            'editassignment',
            'editassignment/:id',

            'editlesson',
            'editlesson/:id',

            'editparticipant',
            'editparticipant/:id',

            'editsegment',
            'editsegment/:id',

            // Delete
            'removegroup',
            'removegroup/:id',

            'removecourse',
            'removecourse/:id',

            'removeassignment',
            'removeassignment/:id',

            'removelesson',
            'removelesson/:id',

            'removeparticipant',
            'removeparticipant/:id',

            'removesegment',
            'removesegment/:id'


        ];

        routes['admin'] = ['dashboard', 'teacher', 'assignments', 'groups', 'group/:id', 'editgroup/:id', 'removegroup/:id', 'creategroup', 'createcourse/:id', 'course/:id'];

        return routes[role];
    }
}