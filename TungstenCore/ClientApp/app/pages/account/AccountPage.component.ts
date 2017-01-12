import { Component, OnInit, Inject, Output } from '@angular/core';
import { MembershipService } from '../../services/membership.service';
import { User } from '../../classes/user';
import { AccountService } from '../../services/account.service';
import { OperationResult } from '../../classes/operationresult';
import { UserAnnouncer } from '../../services/UserAnnouncer';
import { Subscription } from 'rxjs/Subscription';


@Component({
    template: require('./AccountPage.html')
})
export class AccountPage implements OnInit {
    user: User;
    newuser: User = new User('', '', '', '', []);
    subscription: Subscription;

    constructor( @Inject(MembershipService) private _MembershipService: MembershipService,
        @Inject(AccountService) private _AccountService: AccountService,
        @Inject(UserAnnouncer) private _UserAnnouncer: UserAnnouncer
    ) { }


    ngOnInit() {
        this.user = this._MembershipService.getLoggedInUser();
        //this._MembershipService.getLoggedInUser();

        this.subscription = this._UserAnnouncer.userAnnounced.subscribe((result) => {
            this.user = result;
        });
    }

    Save() {
        var _authenticationResult: OperationResult = new OperationResult(false, '');
        this._AccountService.EditAccount(this.newuser)
            .subscribe(res => {
            _authenticationResult = res;
        },
            error => console.error('Error: ' + <any>error),
            () => {
                if (_authenticationResult.Succeeded) {
                    if (this.newuser.Email)
                        this.user.Email = this.newuser.Email;
                    if (this.newuser.UserName)
                    {
                        this.user.UserName = this.newuser.UserName;
                        this.user.Name = this.newuser.UserName;
                    }

                    this._UserAnnouncer.announceUser(this.user);
                    localStorage.setItem('user', JSON.stringify(this.user));
                }
                else {
                    
                }


            });
    }
}