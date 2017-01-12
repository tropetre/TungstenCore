import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Assignment } from '../../classes/assignment';
import { AssignmentService } from '../assignment.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AssignmentResolver implements Resolve<Assignment> {

    constructor(
        @Inject(AssignmentService) private _AssignmentService: AssignmentService,
        @Inject(Router) private _Router: Router


    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.params['id']) {
            let lesson = this._AssignmentService.getById(route.params['id']);

            if (lesson) {
                return lesson;
            }
            else {
                console.log('assignment get fail');
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