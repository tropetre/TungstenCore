import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../../classes/user';
import { IGroup } from '../../../../interfaces/group';
import { GroupService } from '../../../../services/groupservice';

@Component({
    templateUrl: './lms/pages/dashboard/pages/editgroup/editgroup.component.html'
})
export class EditGroupPage implements OnInit {
    private Group: IGroup;
    private user: User;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        this._ActivatedRoute.data.subscribe((data: { user: User, group: IGroup }) => {
            this.Group = data.group;
            this.user = data.user;
        });
    }

    Save() {
        this._GroupService.editGroup(this.Group).subscribe((group) => {
            this.Group = group;
            console.log(group);
        }, error => console.error(error), () => {
                this._Router.navigate(['/dashboard']);
        });
    }
}