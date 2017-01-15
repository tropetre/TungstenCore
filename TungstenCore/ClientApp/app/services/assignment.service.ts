import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { DataService } from './data.service';
import { IAssignment } from '../interfaces/assignment';

import 'rxjs/rx';

@Injectable()
export class AssignmentService {
    private _AssignmentGetAllAPI: string = '/assignment/getall';
    private _AssignmentGetByIdAPI: string = '/assignment/GetById';
    private _AssignmentCreateAPI: string = '/assignment/Create';
    private _AssignmentDeleteAPI: string = '/assignment/Delete';
    private _AssignmentEditAPI: string = '/assignment/Edit';

    constructor( @Inject(DataService) private _DataService: DataService) { }

    getAll(): Observable<IAssignment[]> {
        this._DataService.set(this._AssignmentGetAllAPI);
        return this._DataService.get()
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractDatalist);
    }

    getById(id: string): Observable<IAssignment> {
        this._DataService.set(this._AssignmentGetByIdAPI);
        return this._DataService.post({ id: id })
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Create(assignment: IAssignment) {
        this._DataService.set(this._AssignmentCreateAPI);
        return this._DataService.post(assignment)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Delete(assignment: IAssignment) {
        this._DataService.set(this._AssignmentDeleteAPI);
        return this._DataService.post(assignment)
            .do(this.logData)
            .catch(this.handleError);
    }

    Edit(assignment: IAssignment) {
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

    private extractDatalist(res: IAssignment[]) {
        let body = <IAssignment[]>res;
        return body || [];
    }

    private extractData(res: IAssignment) {
        let body = <IAssignment>res;
        return body || null;
    }
}