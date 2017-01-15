import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ICourse } from '../../../../interfaces/course';
import { ILesson } from '../../../../interfaces/lesson';

@Component({
    template: require('./lesson.component.html')
})
export class LessonPage implements OnInit {
    private lesson: ILesson;
    private lessons: ILesson[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { lesson: ILesson }) => {
                this.lesson = data.lesson;
                console.log(data.lesson);
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { lessons: ILesson[] }) => {
                this.lessons = data.lessons;
                console.log(data.lessons);
            }, error => console.error(error), () => {
                if (!this.lessons.length)
                    this._Router.navigate(['../']);
            });
        }
    }
}