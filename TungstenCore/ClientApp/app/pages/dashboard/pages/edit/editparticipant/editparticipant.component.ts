import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../../services/account.service';
import { IGroup } from '../../../../../interfaces/group';
import { IUser } from '../../../../../interfaces/user';
import { User } from '../../../../../classes/user';
import { OperationResult } from '../../../../../classes/operationResult';

@Component({
    template: require('./editparticipant.component.html')
})
export class EditParticipantPage implements OnInit {
    private groups: IGroup[];
    private user: IUser;
    private users: IUser[];
    private statusmessage: string;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(AccountService) private _AccountService: AccountService,
        @Inject(Router) private _Router: Router
    )
    { }

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
                this.users = data.users;

                this.users.forEach((val, index, obj) => {
                    val.Roles.push('Student');

                });

                this.user = this.users[0];
                //this.users = data.users;
                this.groups = data.groups;
            }, error => console.error(error), () => {
                console.log(this.users);
                console.log(this.user);
                if (!this.users.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    save() {
        this.user.ConfirmPassword = this.user.Password;
        this._AccountService.EditAccount(this.user).subscribe((result: OperationResult) => {
            if (result.Succeeded === true)
                this._Router.navigate(['../']);
            else
                this.statusmessage = result.Message;
        });
    }

    generateUsername() {
        this.user.UserName = Math.random().toString(36).substring(2, 8);
    }

    generatePassword() {
        let text = '';
        let possible = 'abcdefghijklmnopqrstuvwxyz';
        let possible1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let possible2 = '0123456789';
        let possible3 = '!@#$%^&*';

        for (let i = 0; i < 3; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        text += possible1.charAt(Math.floor(Math.random() * possible1.length));
        text += possible2.charAt(Math.floor(Math.random() * possible2.length));
        text += possible3.charAt(Math.floor(Math.random() * possible3.length));

        this.user.Password = text;
    }


}