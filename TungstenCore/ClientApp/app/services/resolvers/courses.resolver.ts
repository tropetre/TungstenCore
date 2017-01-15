import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ICourse } from '../../interfaces/course';
import { CourseService } from '../course.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CoursesResolver implements Resolve<ICourse[]> {

    constructor(
        @Inject(CourseService) private _CourseService: CourseService,
        @Inject(Router) private _Router: Router


    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let courses = this._CourseService.getCourses();
        if (courses) {
            return courses;
        }
        else {
            console.log('courses get fail');
            this._Router.navigate(['/']);
            return null;
        }
    }
}
