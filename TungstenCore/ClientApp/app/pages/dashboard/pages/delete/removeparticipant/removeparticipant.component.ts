import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../../services/account.service';
import { IUser } from '../../../../../interfaces/user';
import { User } from '../../../../../classes/user';
import { GroupService } from '../../../../../services/groupservice';
import { IGroup } from '../../../../../interfaces/group';
import { Group } from '../../../../../classes/group';

@Component({
    template: require('./removeparticipant.component.html')
})
export class RemoveParticipantPage implements OnInit {
    private user: IUser;
    private users: IUser[];
    private group: IGroup;
    private groups: IGroup[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(AccountService) private _AccountService: AccountService,
        @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private _Router: Router

    ) { }

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { user: IUser, groups: IGroup[] }) => {
                this.user = data.user;
                this.groups = data.groups;
            }, error => console.error(error), () => {
                if (!this.user)
                    this._Router.navigate(['../']);
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { users: IUser[], groups: IGroup[] }) => {
                console.log(data.groups);
                this.users = data.users;
                this.user = this.users[0] || new User('','','','',['']);
                //this.users = data.users;
                this.groups = data.groups;
                this.group = this.groups[0] || new Group('','');
            }, error => console.error(error), () => {
                console.log(this.users);
                console.log(this.user);
                if (!this.users.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    remove() {
        this._GroupService.removeUser(this.user.Id, this.group.Id).subscribe(result => {
            if (result.Success === true) {
                this._Router.navigate(['../']);
            } else {
                console.error('user was not removed');
            }

        });

    }

}