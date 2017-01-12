import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { DataService } from './data.service';
import { Assignment } from '../classes/assignment';

import 'rxjs/rx';

@Injectable()
export class AssignmentService {
    private _AssignmentGetAllAPI: string = '/Home/GetAllAssignments';
    private _AssignmentGetByIdAPI: string = '/Home/GetAssignment';
    private _AssignmentCreateAPI: string = '/Home/CreateAssignment';
    private _AssignmentDeleteAPI: string = '/Home/DeleteAssignment';
    private _AssignmentEditAPI: string = '/Home/EditAssignment';

    constructor( @Inject(DataService) private _DataService: DataService) { }

    getAll(): Observable<Assignment[]> {
        this._DataService.set(this._AssignmentGetAllAPI);
        return this._DataService.get()
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractDatalist);
    }

    getById(id: string): Observable<Assignment> {
        this._DataService.set(this._AssignmentGetByIdAPI);
        return this._DataService.post({ id: id })
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Create(assignment: Assignment) {
        this._DataService.set(this._AssignmentCreateAPI);
        return this._DataService.post(assignment)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Delete(id: string) {
        this._DataService.set(this._AssignmentDeleteAPI);
        return this._DataService.post(id)
            .do(this.logData)
            .catch(this.handleError);
    }

    Edit(assignment: Assignment) {
        this._DataService.set(this._AssignmentEditAPI);
        return this._DataService.post(assignment)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    private logData(data) {
        console.log(String(data));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractDatalist(res: Response) {
        if (res.headers.get('Content-Type') === 'text/html; charset=utf-8' && res.text()[0] == '<') {
            console.error('Response Invalid');
            console.error({
                Content_type: 'text/html; charset=utf-8',
                URI: res.url,
                Response: res
            });
            return null;
        }
        let body = <Assignment[]>res.json();
        return body || [];
    }

    private extractData(res: Response) {
        if (res.headers.get('Content-Type') === 'text/html; charset=utf-8' && res.text()[0] == '<') {
            console.error('Response Invalid');
            console.error({
                Content_type: 'text/html; charset=utf-8',
                URI: res.url,
                Response: res
            });
            return null;
        }
        let body = <Assignment>res.json();
        return body || null;
    }
}