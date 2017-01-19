import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../../services/groupservice';
import { IGroup } from '../../../../interfaces/group';
import { IUser } from '../../../../interfaces/user';
import { User } from '../../../../classes/user';

import 'rxjs/add/operator/switchMap';

@Component({
    template: require('./group.component.html')
})
export class GroupPage implements OnInit {
    private Group: IGroup;
    private user: IUser;
    private groupparticipants: IUser[] = new Array<User>();

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(GroupService) private _GroupService: GroupService
        ) { };

        ngOnInit() {
            this._ActivatedRoute.data.subscribe((data: { user: IUser, group: IGroup }) => {
                this.user = data.user;
                this.Group = data.group;
                console.log(this.Group);
                this.Group.Participants.map(participant => {
                    //this.groupparticipants.push(participant.ApplicationUser);
                });
            });
        }
}