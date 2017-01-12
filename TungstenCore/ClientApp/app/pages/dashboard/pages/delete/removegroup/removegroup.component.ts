import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../../../classes/user';
import { GroupService } from '../../../../../services/groupservice';
import { IGroup } from '../../../../../interfaces/group';

@Component({
    template: require('./removegroup.component.html')
})
export class RemoveGroupPage implements OnInit {
    private Group: IGroup;
    private Groups: IGroup[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { Group: IGroup }) => {
                this.Group = data.Group;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { Groups: IGroup[] }) => {
                this.Groups = data.Groups;
            }, error => console.error(error), () => {
                if (!this.Groups.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Remove() {
        this._GroupService.deleteGroup(this.Group.Id).subscribe((group) => {
            this.Group = group;
        }, error => console.error(error), () => {
            this._Router.navigate(['../']);
        });
    }
}