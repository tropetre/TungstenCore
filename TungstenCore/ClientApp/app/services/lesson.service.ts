import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { DataService } from './data.service';
import { Lesson } from '../classes/lesson';

import 'rxjs/rx';

@Injectable()
export class LessonService {
    private _LessonGetAllAPI: string = '/Home/GetAllLessons';
    private _LessonGetByIdAPI: string = '/Home/GetLesson';
    private _LessonCreateAPI: string = '/Home/CreateLesson';
    private _LessonDeleteAPI: string = '/Home/DeleteLesson';
    private _LessonEditAPI: string = '/Home/EditLesson';

    constructor( @Inject(DataService) private _DataService: DataService) { }

    getAll(): Observable<Lesson[]> {
        this._DataService.set(this._LessonGetAllAPI);
        return this._DataService.get()
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractDatalist);
    }

    getById(id: string): Observable<Lesson> {
        this._DataService.set(this._LessonGetByIdAPI);
        return this._DataService.post({ id: id })
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Create(group: Lesson) {
        this._DataService.set(this._LessonCreateAPI);
        return this._DataService.post(group)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Delete(id: string) {
        this._DataService.set(this._LessonDeleteAPI);
        return this._DataService.post(id)
            .do(this.logData)
            .catch(this.handleError);
    }

    Edit(group: Lesson) {
        this._DataService.set(this._LessonEditAPI);
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
        let body = <Lesson[]>res.json();
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
        let body = <Lesson>JSON.parse(res.json());
        return body || null;
    }
}