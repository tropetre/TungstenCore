import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { DataService } from './data.service';
import { Segment } from '../classes/segment';

import 'rxjs/rx';

@Injectable()
export class SegmentService {
    private _SegmentGetAllAPI: string = '/Home/GetAllSegments';
    private _SegmentGetByIdAPI: string = '/Home/GetSegment';
    private _SegmentCreateAPI: string = '/Home/CreateSegment';
    private _SegmentDeleteAPI: string = '/Home/DeleteSegment';
    private _SegmentEditAPI: string = '/Home/EditSegment';

    constructor( @Inject(DataService) private _DataService: DataService) { }

    getAll(): Observable<Segment[]> {
        this._DataService.set(this._SegmentGetAllAPI);
        return this._DataService.get()
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractDatalist);
    }

    getById(id: string): Observable<Segment> {
        this._DataService.set(this._SegmentGetByIdAPI);
        return this._DataService.post({ id: id })
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Create(group: Segment) {
        this._DataService.set(this._SegmentCreateAPI);
        return this._DataService.post(group)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Delete(id: string) {
        this._DataService.set(this._SegmentDeleteAPI);
        return this._DataService.post(id)
            .do(this.logData)
            .catch(this.handleError);
    }

    Edit(group: Segment) {
        this._DataService.set(this._SegmentEditAPI);
        return this._DataService.post(group)
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
        let body = <Segment[]>res.json();
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
        let body = <Segment>JSON.parse(res.json());
        return body || null;
    }
}