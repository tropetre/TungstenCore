import { Injectable, Inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { MembershipService } from '../membership.service';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class isloggedin implements Resolve<boolean> {
    constructor( @Inject(MembershipService) private _MembershipService: MembershipService) { }

    resolve(): Observable<boolean> {
        return Observable.of(this._MembershipService.isUserAuthenticated());
    }

};