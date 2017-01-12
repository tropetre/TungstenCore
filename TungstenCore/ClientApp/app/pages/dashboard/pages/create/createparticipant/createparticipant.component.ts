import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../../services/account.service';
import { IGroup } from '../../../../../interfaces/group';
import { User } from '../../../../../classes/user';
import { OperationResult } from '../../../../../classes/operationResult';

@Component({
    template: require('./createparticipant.component.html')
})
export class CreateParticipantPage implements OnInit {
    private groups: IGroup[];
    private user: User = new User('', '', '', '', ['Student']);
    private statusmessage: string;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(AccountService) private _AccountService: AccountService,
        @Inject(Router) private _Router: Router
    )
    { }

    ngOnInit() {
        this._ActivatedRoute.data.subscribe((data: { groups: IGroup[] }) => {
            this.groups = data.groups;
            //console.info(data.groups);
        }, error => console.error(error), () => {
            
            if (!this.groups.length)
                this._Router.navigate(['../']);
        });
    }

    create() {
        console.log('sub');
        this.user.ConfirmPassword = this.user.Password;
        this._AccountService.CreateAccount(this.user).subscribe((result: OperationResult) => {
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