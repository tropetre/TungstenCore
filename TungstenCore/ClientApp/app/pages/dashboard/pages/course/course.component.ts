﻿import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../../../../services/course.service';

@Component({
    templateUrl: './lms/pages/dashboard/pages/course/course.component.html',
    providers: [CourseService]
})
export class CoursePage implements OnInit {
    private Course;

    constructor(
        @Inject(ActivatedRoute) private route: ActivatedRoute,
        @Inject(CourseService) private _CourseService: CourseService
    ) { };

    ngOnInit() {
        let id = this.route.snapshot.params['courseid'];

        this._CourseService.getCourseById(id)
            .subscribe((course) => { this.Course = course; },
            error => console.error(error),
            () => {
                //console.log(this.Course);
            });

    }
}