import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ISegment } from '../../interfaces/segment';
import { SegmentService } from '../segment.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class SegmentResolver implements Resolve<ISegment> {

    constructor(
        @Inject(SegmentService) private _SegmentService: SegmentService,
        @Inject(Router) private _Router: Router


    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.params['id']) {
            let segment = this._SegmentService.getById(route.params['id']);

            if (segment) {
                return segment;
            }
            else {
                console.log('segment get fail');
                this._Router.navigate(['/']);
                return null;
            }
        }
        else {
            console.log('no id param');
            this._Router.navigate(['/']);
            return null;
        }
    }
}