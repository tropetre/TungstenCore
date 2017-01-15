import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ILesson } from '../../../../../interfaces/lesson';
import { Lesson } from '../../../../../classes/lesson';
import { ICourse } from '../../../../../interfaces/course';
import { LessonService } from '../../../../../services/lesson.service';

@Component({
    template: require('./editlesson.component.html')
})
export class EditLessonPage implements OnInit {
    private lesson: ILesson;
    private lessons: ILesson[];
    private courses: ICourse[];
    private statusmessage: string;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(LessonService) private _LessonService: LessonService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { lesson: ILesson, courses: ICourse[] }) => {
                this.lesson = data.lesson
                this.courses = data.courses;
                console.log(this.lesson);
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { lessons: ILesson[], courses: ICourse[] }) => {
                this.lessons = data.lessons;
                console.log(this.lessons);
                this.lesson = this.lessons[0] || new Lesson('', '');
                this.courses = data.courses;

                if (!this.lessons || !this.lesson) {
                    this._Router.navigate(['/dashboard', 'createlesson']);
                    return false;
                }
                    
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