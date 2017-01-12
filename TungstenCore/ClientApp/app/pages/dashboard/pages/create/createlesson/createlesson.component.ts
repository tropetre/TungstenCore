import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../../services/lesson.service';
import { Lesson } from '../../../../../classes/lesson';
import { Course } from '../../../../../classes/course';

@Component({
    template: require('./createlesson.component.html')
})
export class CreateLessonPage implements OnInit {
    private lesson: Lesson;
    private courses: Course[];
    private statusmessage: string;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(LessonService) private _LessonService: LessonService,
        @Inject(Router) private _Router: Router
    )
    { }

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this.lesson.CourseId = id;
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { courses: Course[] }) => {
                this.courses = data.courses;
            }, error => console.error(error), () => {

                if (!this.courses.length)
                    this._Router.navigate(['/dashboard']);
            });
        }
    }

    create() {
        this._LessonService.Create(this.lesson).subscribe((result) => {
            if (result.CourseId)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';
        });
    }
}