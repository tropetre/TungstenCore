import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IUser } from '../../../../../interfaces/user';
import { ICourse } from '../../../../../interfaces/course';
import { CourseService } from '../../../../../services/course.service';
import { IGroup } from '../../../../../interfaces/group';

@Component({
    template: require('./editcourse.component.html')
})
export class EditCoursePage implements OnInit {
    private course: ICourse;
    private courses: ICourse[];
    private groups: IGroup[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(CourseService) private _CourseService: CourseService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { course: ICourse, groups: IGroup[] }) => {
                this.course = data.course;
                this.groups = data.groups;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { courses: ICourse[], groups: IGroup[] }) => {
                this.courses = data.courses;
                this.course = this.courses[0];
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