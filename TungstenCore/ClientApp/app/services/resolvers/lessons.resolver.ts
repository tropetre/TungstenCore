import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ILesson } from '../../interfaces/lesson';
import { LessonService } from '../lesson.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LessonsResolver implements Resolve<ILesson[]> {

    constructor(
        @Inject(LessonService) private _LessonService: LessonService,
        @Inject(Router) private _Router: Router


    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let lessons = this._LessonService.getAll();
        if (lessons) {
            return lessons;
        }
        else {
            console.log('lessons get fail');
            this._Router.navigate(['/']);
            return null;
        }
    }
}
