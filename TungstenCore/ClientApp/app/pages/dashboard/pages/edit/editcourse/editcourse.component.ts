import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../../../classes/user';
import { Course } from '../../../../../classes/course';
import { CourseService } from '../../../../../services/course.service';
import { Group } from '../../../../../classes/group';

@Component({
    template: require('./editcourse.component.html')
})
export class EditCoursePage implements OnInit {
    private course: Course;
    private courses: Course[];
    private groups: Group[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(CourseService) private _CourseService: CourseService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { course: Course, groups: Group[] }) => {
                this.course = data.course;
                this.groups = data.groups;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { courses: Course[], groups: Group[] }) => {
                this.courses = data.courses;
                this.groups = data.groups;
            }, error => console.error(error), () => {

                if (!this.courses.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Save() {
        this._CourseService.edit(this.course).subscribe((course) => {
            this.course = course;
        }, error => console.error(error), () => {
                this._Router.navigate(['../']);
        });
    }
}