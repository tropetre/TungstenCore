import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IUser } from '../../interfaces/user';
import { MembershipService } from '../membership.service';
import { UserAnnouncer } from '../userannouncer';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class userresolver implements Resolve<IUser> {
    constructor( @Inject(MembershipService) private _MembershipService: MembershipService,
        @Inject(Router) private _Router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
        var _user: any = localStorage.getItem('user');
        if (_user != null)
            return Observable.of(JSON.parse(_user));
        else {
            let user = this._MembershipService.getUserInfo();

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            } else {
                this._Router.navigate(['/']);
                return null;
            }
        }
    }

};