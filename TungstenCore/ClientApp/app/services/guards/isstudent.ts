import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MembershipService } from '../membership.service';

@Injectable()
export class isStudentGuard implements CanActivate {
    constructor( @Inject(MembershipService) private _membershipService: MembershipService, @Inject(Router) private router: Router) { }


    canActivate() {
        if (this._membershipService.getLoggedInUser().Roles.indexOf('Student') != -1) {
            return true;
        } else {
            this.router.navigateByUrl('');
            return false;
        }
    }
}