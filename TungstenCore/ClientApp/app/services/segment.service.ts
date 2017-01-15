import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { DataService } from './data.service';
import { ISegment } from '../interfaces/segment';

import 'rxjs/rx';

@Injectable()
export class SegmentService {
    private _SegmentGetAllAPI: string = '/Segment/GetAll';
    private _SegmentGetByIdAPI: string = '/Segment/GetById';
    private _SegmentCreateAPI: string = '/Segment/Create';
    private _SegmentDeleteAPI: string = '/Segment/Delete';
    private _SegmentEditAPI: string = '/Segment/Edit';

    constructor( @Inject(DataService) private _DataService: DataService) { }

    getAll(): Observable<ISegment[]> {
        this._DataService.set(this._SegmentGetAllAPI);
        return this._DataService.get()
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractDatalist);
    }

    getById(id: string): Observable<ISegment> {
        this._DataService.set(this._SegmentGetByIdAPI);
        return this._DataService.post({ id: id })
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Create(segment: ISegment) {
        this._DataService.set(this._SegmentCreateAPI);
        return this._DataService.post(segment)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Delete(segment: ISegment) {
        this._DataService.set(this._SegmentDeleteAPI);
        return this._DataService.post(segment)
            //.do(this.logData)
            .catch(this.handleError);
    }

    Edit(segment: ISegment) {
        this._DataService.set(this._SegmentEditAPI);
        return this._DataService.post(segment)
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

    private extractDatalist(res: ISegment[]) {
        let body = <ISegment[]>res;
        return body || [];
    }

    private extractData(res: ISegment) {
        let body = <ISegment>res;
        return body || null;
    }
}