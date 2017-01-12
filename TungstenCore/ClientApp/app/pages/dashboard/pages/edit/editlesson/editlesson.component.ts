import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Lesson } from '../../../../../classes/lesson';
import { Course } from '../../../../../classes/course';
import { LessonService } from '../../../../../services/lesson.service';

@Component({
    template: require('./editlesson.component.html')
})
export class EditLessonPage implements OnInit {
    private lesson: Lesson;
    private lessons: Lesson[];
    private courses: Course[];
    private statusmessage: string;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(LessonService) private _LessonService: LessonService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { lesson: Lesson, courses: Course[] }) => {
                this.lesson = data.lesson;
                this.courses = data.courses;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { lessons: Lesson[], courses: Course[] }) => {
                this.lessons = data.lessons;
                this.courses = data.courses;
            }, error => console.error(error), () => {

                if (!this.lessons.length)
                    this._Router.navigate(['../']);
            });
        }

        
    }

    Save() {
        this._LessonService.Edit(this.lesson).subscribe((result) => {
            if (result.Id)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';
        });
    }
}