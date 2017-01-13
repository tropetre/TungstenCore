import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Assignment } from '../../classes/assignment';
import { AssignmentService } from '../assignment.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AssignmentsResolver implements Resolve<Assignment[]> {

    constructor(
        @Inject(AssignmentService) private _AssignmentService: AssignmentService,
        @Inject(Router) private _Router: Router


    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let assignments = this._AssignmentService.getAll();
        if (assignments) {
            return assignments;
        }
        else {
            console.log('assignments get fail');
            //this._Router.navigate(['/']);
            return null;
        }
    }
}
