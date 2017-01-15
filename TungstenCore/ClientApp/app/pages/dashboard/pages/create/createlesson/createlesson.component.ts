import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../../services/lesson.service';
import { ILesson } from '../../../../../interfaces/lesson';
import { ICourse } from '../../../../../interfaces/course';
import { Lesson } from '../../../../../classes/lesson';
@Component({
    template: require('./createlesson.component.html')
})
export class CreateLessonPage implements OnInit {
    private lesson: ILesson = new Lesson('','');
    private courses: ICourse[];
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
            this._ActivatedRoute.data.subscribe((data: { courses: ICourse[] }) => {
                this.courses = data.courses;
            }, error => console.error(error), () => {

                if (!this.courses.length)
                    this._Router.navigate(['/dashboard']);
            });
        }
    }

    create() {
        console.log(this.lesson);
        this._LessonService.Create(this.lesson).subscribe((result) => {
            if (result.Id)
                this._Router.navigate(['/dashboard']);
            else
                this.statusmessage = 'failed try again!';
        });
    }
}