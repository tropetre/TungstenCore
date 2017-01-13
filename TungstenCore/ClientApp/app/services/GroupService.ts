import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { IGroup } from '../interfaces/Group';
import { DataService } from './data.service';
import { User } from '../classes/user';

import 'rxjs/rx';

@Injectable()
export class GroupService {
    constructor( @Inject(Http) private _http: Http) { }

    getGroups(): Observable<IGroup[]> {
        return this._http.get('/Group/GetGroups')
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractGroups);

    }

    getGroupById(id: string): Observable<IGroup> {
        return this._http.post('/Group/GetGroup/', { id: id })
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractGroup);
    }

    createGroup(group: IGroup) {
        return this._http.post('/Group/CreateGroup/', group)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractGroup);
    }

    deleteGroup(id: string) {
        return this._http.post('/Group/DeleteGroup', id)
            .do(this.logData)
            .catch(this.handleError);
    }

    editGroup(group: IGroup) {
        return this._http.post('/Group/EditGroup', group)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractGroup);
    }

    addUser(id: string, gid: string) {
        return this._http.post('/Group/AddUserToGroup', { userid : id, groupid : gid})
            //.do(this.logData)
            .catch(this.handleError)
            .map(result => {
                return result.json();
            });
    }

    removeUser(id: string, gid:string) {
        return this._http.post('/Group/RemoveUserFromGroup', { userid: id, groupid: gid })
            //.do(this.logData)
            .catch(this.handleError)
            .map(result => {
                return result.json();
            });
    }

    private logData(data) {
        console.log(String(data));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractGroups(res: Response) {
        if (res.headers.get('Content-Type') === 'text/html; charset=utf-8' && res.text()[0] == '<') {
            console.error('Response Invalid');
            console.error({
                Content_type: 'text/html; charset=utf-8',
                URI: res.url,
                Response: res
            });
            return null;
        }
        let body = <IGroup[]>res.json();
        return body || [];
    }

    private extractGroup(res: Response) {
        if (res.headers.get('Content-Type') === 'text/html; charset=utf-8' && res.text()[0] == '<') {
            console.error('Response Invalid');
            console.error({
                Content_type: 'text/html; charset=utf-8',
                URI: res.url,
                Response: res
            });
            return null;
        }
        let body = <IGroup>res.json();
        return body || null;
    }
}