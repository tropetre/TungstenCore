import { Component, OnInit, Inject, Input, ElementRef, ViewChild, Renderer, Directive, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../classes/User';
import { LoginModel } from '../../classes/LoginModel';
import { OperationResult } from '../../classes/operationResult';
import { MembershipService } from '../../services/membership.service';
import { Autofocus } from '../../directives/autofocus';
import { UserAnnouncer } from '../../services/userannouncer';

@Component({
    selector: 'lms-login',
    template: require('./Login.html'),
    providers: []
})
export class Login implements OnInit {
    @Input() LoginPanelIsOpen: boolean;
    @Input() _UserAnnouncer: UserAnnouncer;
    Timeout: any;

    public _user: User;
    public loginmodel: LoginModel;
    LoggedIn: boolean;
    @Output() userUpdated = new EventEmitter();

    constructor( @Inject(MembershipService) public membershipService: MembershipService,
        //public notificationService: NotificationService,
        @Inject(Router) public router: Router,
        /*@Inject(UserAnnouncer) private _UserAnnouncer: UserAnnouncer*/) { }

    ngOnInit() {
        this.loginmodel = new LoginModel('', '');
        this.LoggedIn = this.membershipService.isUserAuthenticated();
    }

    eventHandler(key) {
        console.log(key);
    } 

    OpenPanel(): void {
        this.LoginPanelIsOpen = true;
        //this.usernameInput.focus();
        //this._elements.nativeElement.focus();
    }

    StopHidingPanel() {
        clearTimeout(this.Timeout);
    }

    ClosePanel(): void {
        this.Timeout = setTimeout(() => {
            this.LoginPanelIsOpen = false;
        }, 1000);
    }

    login(): void {
        var _authenticationResult: OperationResult = new OperationResult(false, '');
        this.membershipService.login({ Username: this.loginmodel.Username, Password: this.loginmodel.Password, RememberMe: this.loginmodel.RememberMe })
            .subscribe(res => {
                _authenticationResult = res;
            },
            error => console.error('Error: ' + <any>error),
            () => {
                if (_authenticationResult.succeeded) {
                    this.membershipService.getUserInfo()
                        .subscribe(ress => {
                            this._user = ress;
                        },
                        error => console.error('Error: ' + <any>error),
                        () => {
                            if (!this._user.Roles[0])
                                this._user.Roles[0] = 'student';
                            else
                                this._user.Roles[0] = this._user.Roles[0].toLowerCase();
                            this._user.Password = '';
                            this._UserAnnouncer.announceUser(this._user);
                            //this.userUpdated.emit(this._user);

                            localStorage.setItem('user', JSON.stringify(this._user));
                            this.router.navigate(['/dashboard']);

                            this.LoggedIn = _authenticationResult.succeeded;
                        });
                }
                else {
                    // login unsuccessful
                }
                
                
            });
    };
}