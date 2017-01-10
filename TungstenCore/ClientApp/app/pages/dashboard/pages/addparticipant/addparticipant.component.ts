import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../../classes/user';
import { GroupService } from '../../../../services/groupservice';
import { IGroup } from '../../../../interfaces/group';
import { Http } from '@angular/http';

@Component({
    templateUrl: './lms/pages/dashboard/pages/addparticipant/addparticipant.component.html'
})
export class AddParticipantPage implements OnInit {
    private Group: IGroup;
    private users: User[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Http) private _Http: Http
    ) { };

    ngOnInit() {
        this._ActivatedRoute.data.subscribe((data: { users: User[], group: IGroup }) => {
            this.users = data.users;
            //console.log(this.users);
            this.Group = data.group;

            this.users = this.users.filter((user) => {
                let tempgroups = user.Groups.filter((group) => {
                    return group.Id == this.Group.Id
                })
                return (tempgroups.length < 1);
            })
        });
    }

    addUser(user: User): void {
        this._GroupService.addUser(user.Id, this.Group.Id).subscribe((result) => {
            if (result.Success === true) {
                this.users = this.users.filter((usertofilter) => {
                    return usertofilter.Id != user.Id;
                })
            } else {
                console.error('user was not added');
            }

        });
    }
}