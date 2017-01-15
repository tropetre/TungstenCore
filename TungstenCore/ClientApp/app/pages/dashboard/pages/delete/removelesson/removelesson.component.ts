import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LessonService } from '../../../../../services/lesson.service';
import { Lesson } from '../../../../../classes/lesson';
import { ILesson } from '../../../../../interfaces/lesson';

@Component({
    template: require('./removelesson.component.html')
})
export class RemoveLessonPage implements OnInit {
    private lesson: ILesson;
    private lessons: ILesson[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(LessonService) private _LessonService: LessonService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { lesson: ILesson }) => {
                this.lesson = data.lesson;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { lessons: ILesson[] }) => {
                this.lessons = data.lessons;
                this.lesson = data.lessons[0] || new Lesson('', '');

                if (!this.lessons.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Remove() {
        this._LessonService.Delete(this.lesson).subscribe((lesson) => {
            this.lesson = lesson;
        }, error => console.error(error), () => {
            this._Router.navigate(['../']);
        });
    }
}