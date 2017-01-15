import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { IUser } from '../../interfaces/user';
import { MembershipService } from '../membership.service';
import { UserAnnouncer } from '../userannouncer';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class usersresolver implements Resolve<IUser[]> {
    constructor(
        @Inject(Http) private http: Http,
        @Inject(Router) private _Router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> {
        let users: Observable<IUser[]> = this.http.get('/Account/GetAllUsers').map((result) => {
            console.log(result.json());
            return <IUser[]>result.json();
        }).first();

        if (users) {
            return users;
        } else {
            this._Router.navigate(['/']);
            return null;
        }
    }

};