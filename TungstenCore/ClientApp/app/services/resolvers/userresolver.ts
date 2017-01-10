import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../../classes/user';
import { MembershipService } from '../membership.service';
import { UserAnnouncer } from '../userannouncer';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class userresolver implements Resolve<User> {
    constructor( @Inject(MembershipService) private _MembershipService: MembershipService,
        @Inject(Router) private _Router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        if (route.params['id'])
        {
            let user = this._MembershipService.getUserInfoById(route.params['id']);

            if (user) {
                return user;
            }
            else
            {
                this._Router.navigate(['/']);
                return null;
            }
        }
        else
        {
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
    }

};