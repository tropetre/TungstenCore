import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { ICourse } from '../interfaces/Course';
import { Course } from '../classes/course';

import 'rxjs/rx';

@Injectable()
export class CourseService {
    constructor( @Inject(Http) private _http: Http) { }

    getCourses(): Observable<ICourse[]> {
        return this._http.get('/Course/GetCourses')
            .do(this.logData)
            .catch(this.handleError)
            .map(this.extractCourses);

    }

    getCourseById(id: string): Observable<ICourse> {
        return this._http.post('/Course/GetCourse/', { id: id })
            .do(this.logData)
            .catch(this.handleError)
            .map(this.extractCourse);
    }

    createCourse(course: ICourse) {
        return this._http.post('/Course/CreateCourse/', course)
            .do(this.logData)
            .catch(this.handleError)
            .map(this.extractCourse);
    }

    deleteCourse(id: string) {
        return this._http.post('/Course/DeleteCourse', id)
            .do(this.logData)
            .catch(this.handleError);
    }

    edit(course: Course) {
        return this._http.post('/Course/EditCourse', course)
            .do(this.logData)
            .catch(this.handleError);
    }

    private logData(data) {
        console.log(String(data));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractCourses(res: Response) {
        let body = <ICourse[]>res.json();
        return body || [];
    }

    private extractCourse(res: Response) {
        let body = <ICourse>res.json();
        return body || null;
    }
}