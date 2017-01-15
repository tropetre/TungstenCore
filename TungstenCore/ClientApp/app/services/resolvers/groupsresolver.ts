import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IGroup } from '../../interfaces/group';
import { GroupService } from '../GroupService';
import { UserAnnouncer } from '../userannouncer';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class GroupsResolver implements Resolve<IGroup[]> {
    constructor( @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private _Router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroup[]> {
        let groups = this._GroupService.getGroups();
        if (groups) {
            return groups;
        } else {
            this._Router.navigate(['/']);
            return null;
        }
    }

};