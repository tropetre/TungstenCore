import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LessonService } from '../../../../../services/lesson.service';
import { Lesson } from '../../../../../classes/lesson';

@Component({
    template: require('./removelesson.component.html')
})
export class RemoveLessonPage implements OnInit {
    private lesson: Lesson;
    private lessons: Lesson[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(LessonService) private _LessonService: LessonService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { lesson: Lesson }) => {
                this.lesson = data.lesson;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { lessons: Lesson[] }) => {
                this.lessons = data.lessons;
            }, error => console.error(error), () => {
                if (!this.lessons.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Remove() {
        this._LessonService.Delete(this.lesson.Id).subscribe((lesson) => {
            this.lesson = lesson;
        }, error => console.error(error), () => {
            this._Router.navigate(['../']);
        });
    }
}