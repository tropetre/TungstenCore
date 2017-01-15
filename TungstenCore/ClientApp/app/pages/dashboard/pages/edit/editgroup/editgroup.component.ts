import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../../../classes/user';
import { IGroup } from '../../../../../interfaces/group';
import { GroupService } from '../../../../../services/groupservice';

@Component({
    template: require('./editgroup.component.html')
})
export class EditGroupPage implements OnInit {
    private Group: IGroup;
    private Groups: IGroup[];
    private user: User;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { user: User, group: IGroup }) => {
                this.Group = data.group;
                this.user = data.user;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { user: User, groups: IGroup[] }) => {
                this.Groups = data.groups;
                this.Group = this.Groups[0];
                this.user = data.user;
            }, error => console.error(error), () => {

                if (!this.Groups.length)
                    this._Router.navigate(['../']);
            });
        }

        
    }

    Save() {
        this._GroupService.editGroup(this.Group).subscribe((group) => {
            this.Group = group;
            console.log(group);
        }, error => console.error(error), () => {
                this._Router.navigate(['../']);
        });
    }
}