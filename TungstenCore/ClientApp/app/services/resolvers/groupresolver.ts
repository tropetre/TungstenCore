import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IGroup } from '../../interfaces/group';
import { GroupService } from '../GroupService';
import { UserAnnouncer } from '../userannouncer';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class GroupResolver implements Resolve<IGroup> {
    constructor( @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private _Router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroup> {
        let group = this._GroupService.getGroupById(route.params['id']);

        if (group) {
            return group;
        } else {
            this._Router.navigate(['/']);
            return null;
        }
    }

};