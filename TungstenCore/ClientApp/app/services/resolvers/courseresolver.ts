import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Course } from '../../classes/course';
import { CourseService } from '../course.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(
        @Inject(CourseService) private _CourseService: CourseService,
        @Inject(Router) private _Router: Router


    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.params['id']) {
            let course = this._CourseService.getCourseById(route.params['id']);

            if (course) {
                return course;
            }
            else {
                console.log('course get fail');
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