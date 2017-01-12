import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../../../../../services/course.service';
import { Course } from '../../../../../classes/course';

@Component({
    template: require('./removecourse.component.html')
})
export class RemoveCoursePage implements OnInit {
    private course: Course;
    private courses: Course[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(CourseService) private _CourseService: CourseService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { course: Course }) => {
                this.course = data.course;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { courses: Course[] }) => {
                this.courses = data.courses;
            }, error => console.error(error), () => {
                if (!this.courses.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Remove() {
        this._CourseService.deleteCourse(this.course.Id).subscribe((course) => {
            this.course = course;
        }, error => console.error(error), () => {
                this._Router.navigate(['../']);
        });
    }
}