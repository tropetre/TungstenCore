// implement the resolve

import { Component, OnInit, Inject } from '@angular/core';
import { GroupService } from '../../services/GroupService';
import { IGroup } from '../../interfaces/Group';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'lms-groups-list',
    template: require('./GroupsList.html'),
})
export class GroupsList implements OnInit/*, Resolve<IGroup[]>*/ {
    Groups: IGroup[];

    constructor( @Inject(GroupService) private _groupService: GroupService,
        @Inject(Router) private router: Router) { }

    ngOnInit(): void {
        this._groupService.getGroups()
            .subscribe(Groups => {
                this.Groups = Groups;
            },
            error => console.error(error));
    }

    logGroupId(id) {
        this.router.navigate(['group', id]);
    }
    /*
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Crisis> {


    }*/
}