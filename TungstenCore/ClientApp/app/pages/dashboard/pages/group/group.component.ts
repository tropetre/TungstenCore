import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../classes/user';
import { GroupService } from '../../../../services/groupservice';
import { IGroup } from '../../../../interfaces/group';

import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './lms/pages/dashboard/pages/group/group.component.html'
})
export class GroupPage implements OnInit {
    private Group: IGroup;
    private user: User;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(GroupService) private _GroupService: GroupService
        ) { };

        ngOnInit() {
            this._ActivatedRoute.data.subscribe((data: { user:User, group: IGroup }) => {
                this.user = data.user;
                this.Group = data.group;
            });
        }
}