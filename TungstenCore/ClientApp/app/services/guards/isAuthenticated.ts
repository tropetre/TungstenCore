import { Injectable, Inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MembershipService } from '../membership.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class isAuthenticatedGuard implements CanActivate, CanActivateChild {
    constructor( @Inject(MembershipService) private _membershipService: MembershipService, @Inject(Router) private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._membershipService.isUserAuthenticated()) {
            //console.log('should gain access to route because he is authenticated');
            return true;
        } else {
            this.router.navigateByUrl('');
            return false;
        }
    }

}