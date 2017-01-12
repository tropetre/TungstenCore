import { Component, Inject, OnInit } from '@angular/core';
import { CourseService } from '../../../../../services/course.service';
import { Course } from '../../../../../classes/Course';
import { Group } from '../../../../../classes/group';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    template: require('./createcourse.component.html')
})
export class CreateCourse implements OnInit {
    private course: Course = new Course('', '', '', '', '');
    private groups: Group[];
    constructor(
        @Inject(CourseService) private _CourseService: CourseService,
        @Inject(Router) private router: Router,
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this.course.GroupId = id;
        }
        else
        {
            this._ActivatedRoute.data.subscribe((data: { groups: Group[] }) => {
                this.groups = data.groups;
            }, error => console.error(error), () => {
                if (!this.groups.length)
                    this.router.navigate(['/dashboard']);
            });
        }
    }

    Create() {
        this._CourseService.createCourse(this.course).subscribe((course) => { this.course = course; }
            , error => console.error(error),
            () => {
                if (this.course.Id)
                {
                    this.router.navigate(['/dashboard', 'group', this.course.GroupId]);
                }
                else
                    console.log('Error creating group');
            });
    }
}