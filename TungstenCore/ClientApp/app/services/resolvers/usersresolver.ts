import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { User } from '../../classes/user';
import { MembershipService } from '../membership.service';
import { UserAnnouncer } from '../userannouncer';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class usersresolver implements Resolve<User[]> {
    constructor(
        @Inject(Http) private http: Http,
        @Inject(Router) private _Router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
        let users: Observable<User[]> = this.http.get('/Home/GetUserList').map((result: Response) => {
            return <User[]>result.json();
        }).first();

        if (users) {
            return users;
        } else {
            this._Router.navigate(['/']);
            return null;
        }
    }

};