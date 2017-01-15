import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { DataService } from './data.service';
import { ILesson } from '../interfaces/lesson';

import 'rxjs/rx';

@Injectable()
export class LessonService {
    private _LessonGetAllAPI: string = '/Lesson/GetAll';
    private _LessonGetByIdAPI: string = '/Lesson/GetById';
    private _LessonCreateAPI: string = '/Lesson/Create';
    private _LessonDeleteAPI: string = '/Lesson/Delete';
    private _LessonEditAPI: string = '/Lesson/Edit';

    constructor( @Inject(DataService) private _DataService: DataService) { }

    getAll(): Observable<ILesson[]> {
        this._DataService.set(this._LessonGetAllAPI);
        return this._DataService.get()
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractDatalist);
    }

    getById(id: string): Observable<ILesson> {
        this._DataService.set(this._LessonGetByIdAPI);
        return this._DataService.post({ id: id })
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Create(lesson: ILesson) {
        this._DataService.set(this._LessonCreateAPI);
        return this._DataService.post(lesson)
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Delete(lesson: ILesson) {
        this._DataService.set(this._LessonDeleteAPI);
        return this._DataService.post(lesson)
            .do(this.logData)
            .catch(this.handleError);
    }

    Edit(lesson: ILesson) {
        this._DataService.set(this._LessonEditAPI);
        return this._DataService.post(lesson)
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

    private extractDatalist(res: ILesson[]) {
        let body = <ILesson[]>res;
        return body || [];
    }

    private extractData(res: ILesson) {
        let body = <ILesson>res;
        return body || null;
    }
}