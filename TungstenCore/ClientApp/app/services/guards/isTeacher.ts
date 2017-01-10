import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MembershipService } from '../membership.service';

@Injectable()
export class isTeacherGuard implements CanActivate {
    constructor( @Inject(MembershipService) private _membershipService: MembershipService, @Inject(Router) private router: Router) { }

    canActivate() {
        if (this._membershipService.getLoggedInUser().Roles.indexOf('Teacher') != -1) {
            console.log('access allowed');
            return true;
        } else {
            this.router.navigateByUrl('');
            return false;
        }
    }
}