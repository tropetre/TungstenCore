import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class UserAnnouncer {
    private user = new Subject<User>();

    userAnnounced = this.user.asObservable();

    constructor() {
        //console.log('announcer constructed');
    }

    announceUser(user: User) {
        //console.log('announce user in userannouncer.ts called with user:')
        //console.log(user);

        if (user.Roles[0] === '')
            user.Roles[0] = 'student';
        else
            user.Roles[0] = user.Roles[0].toLowerCase();

        this.user.next(user);
    }
}