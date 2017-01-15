import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../../../classes/user';
import { GroupService } from '../../../../../services/groupservice';
import { IGroup } from '../../../../../interfaces/group';
import { Group } from '../../../../../classes/group';

@Component({
    template: require('./removegroup.component.html')
})
export class RemoveGroupPage implements OnInit {
    private group: IGroup;
    private groups: IGroup[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { group: IGroup }) => {
                this.group = data.group;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { groups: IGroup[] }) => {
                console.log(data.groups);
                this.groups = data.groups;
                this.group = data.groups[0] || new Group('','');;
            }, error => console.error(error), () => {
                if (!this.groups.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Remove() {
        this._GroupService.deleteGroup(this.group).subscribe((group) => {
            this.group = group;
        }, error => console.error(error), () => {
            this._Router.navigate(['../']);
        });
    }
}