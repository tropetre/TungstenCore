import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Lesson } from '../../classes/lesson';
import { LessonService } from '../lesson.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LessonResolver implements Resolve<Lesson> {

    constructor(
        @Inject(LessonService) private _LessonService: LessonService,
        @Inject(Router) private _Router: Router


    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.params['id']) {
            let lesson = this._LessonService.getById(route.params['id']);

            if (lesson) {
                return lesson;
            }
            else {
                console.log('lesson get fail');
                //this._Router.navigate(['/']);
                return null;
            }
        }
        else {
            console.log('no id param');
            //this._Router.navigate(['/']);
            return null;
        }


    }

}