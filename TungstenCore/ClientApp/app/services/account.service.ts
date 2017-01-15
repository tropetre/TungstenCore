import { DataService } from './data.service';
import { Injectable, Inject } from '@angular/core';
import { IUser } from '../interfaces/user';

@Injectable()
export class AccountService {
    private _CreateAccountAPI: string = '/Account/Register/';
    private _EditAccountAPI: string = '/Manage/EditAccount/';
    private _DeleteAccountAPI: string = '/Manage/DeleteUser/';

    constructor( @Inject(DataService) private _dataservice: DataService) { }



    CreateAccount(user: IUser) {
        this._dataservice.set(this._CreateAccountAPI);
        return this._dataservice.post(user);
    }

    EditAccount(user: IUser): any {
        this._dataservice.set(this._EditAccountAPI);
        return this._dataservice.post(user);
    }

    DeleteAccount(id: string): any {
        this._dataservice.set(this._DeleteAccountAPI);
        this._dataservice.delete(id);
    }
}