﻿import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ICourse } from '../../../../interfaces/course';

@Component({
    template: require('./course.component.html')
})
export class CoursePage implements OnInit {
    private course: ICourse;
    private courses: ICourse[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { course: ICourse }) => {
                this.course = data.course;
                console.log(data.course);
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { courses: ICourse[] }) => {
                this.courses = data.courses;
                console.log(data.courses);
            }, error => console.error(error), () => {
                if (!this.courses.length)
                    this._Router.navigate(['../']);
            });
        }
    }
}