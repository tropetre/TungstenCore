import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../../classes/user';
import { GroupService } from '../../../../services/groupservice';
import { IGroup } from '../../../../interfaces/group';

@Component({
    template: require('./removegroup.component.html')
})
export class RemoveGroupPage implements OnInit {
    private Group;
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

    Remove() {
        this._GroupService.deleteGroup(this.Group.Id).subscribe((group) => {
            this.Group = group;
            console.log(group);
        }, error => console.error(error), () => {
            if (this.user.Roles)
                this._Router.navigate(['/dashboard', { outlets: { dashboard: [this.user.Roles[0].toLowerCase()] } }]);
            else
                this._Router.navigate(['/dashboard', { outlets: { dashboard: ['student'] } }]);
        });
    }
}