import { DataService } from './data.service';
import { Injectable, Inject } from '@angular/core';
import { EditModel } from '../classes/editmodel';

@Injectable()
export class AccountService {
    private _CreateAccountAPI: string = '/Manage/Register/';
    private _EditAccountAPI: string = '/Manage/EditAccount/';
    private _DeleteAccountAPI: string = '/Manage/DeleteUser/';

    constructor( @Inject(DataService) private _dataservice: DataService) { }



    CreateAccount() {
        this._dataservice.set(this._CreateAccountAPI);
    }

    EditAccount(user: EditModel): any {
        this._dataservice.set(this._EditAccountAPI);
        return this._dataservice.post(user);
    }

    DeleteAccount(id: string): any {
        this._dataservice.set(this._DeleteAccountAPI);
        this._dataservice.delete(id);
    }
}