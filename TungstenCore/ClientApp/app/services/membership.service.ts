import { Http, Response, Request } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { DataService } from './data.service';
import { Registration } from '../classes/registration';
import { User } from '../classes/User';
import { LoginModel } from '../classes/LoginModel';

@Injectable()
export class MembershipService {

    private _accountRegisterAPI: string = '/Account/Register/';
    private _accountLoginAPI: string = '/Account/Login/';
    private _accountLogoutAPI: string = '/Account/LogOff/';
    private _accountUserInfo: string = '/Account/GetUserInfo/';
    private _accountUserInfoById: string = '/Account/GetUserInfoById/';


    constructor( @Inject(DataService) public accountService: DataService) { }

    register(newUser: Registration): any {

        this.accountService.set(this._accountRegisterAPI);
        
        return this.accountService.post(newUser);
    }

    login(creds: LoginModel): any {
        this.accountService.set(this._accountLoginAPI);
        return this.accountService.post(creds);
    }

    logout(): any {
        this.accountService.set(this._accountLogoutAPI);
        return this.accountService.post(null);
    }

    isUserAuthenticated(): boolean {
        var _user: any = localStorage.getItem('user');
        if (_user != null)
            return true;
        else
            return false;
    }

    getLoggedInUser(): User {
        var _user: User;

        if (this.isUserAuthenticated()) {
            var _userData = JSON.parse(localStorage.getItem('user'));
            _user = <User>_userData;
        }

        return _user;
    }

    getUserInfo(_user?: User): any {
        this.accountService.set(this._accountUserInfo);
        return this.accountService.post(_user);
    }

    getUserInfoById(id: string): any {
        this.accountService.set(this._accountUserInfoById);
        return this.accountService.post(id);
    }


}