import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../../services/account.service';
import { User } from '../../../../../classes/user';
import { GroupService } from '../../../../../services/groupservice';
import { IGroup } from '../../../../../interfaces/group';

@Component({
    template: require('./removeparticipant.component.html')
})
export class RemoveParticipantPage implements OnInit {
    private user: User;
    private Group: IGroup;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(AccountService) private _AccountService: AccountService,
        @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private _Router: Router

    ) { }

    ngOnInit() {
        this._ActivatedRoute.data.subscribe((data: { user: User, group: IGroup }) => {
            this.user = data.user;
        });
    }

    remove() {
        this._GroupService.removeUser(this.user.Id, this.Group.Id).subscribe(result => {
            if (result.Success === true) {
                this._Router.navigate(['../']);
            } else {
                console.error('user was not removed');
            }

        });

    }

}