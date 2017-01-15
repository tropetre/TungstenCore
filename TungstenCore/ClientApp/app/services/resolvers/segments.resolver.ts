import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ISegment } from '../../interfaces/segment';
import { SegmentService } from '../segment.service';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class SegmentsResolver implements Resolve<ISegment[]> {

    constructor(
        @Inject(SegmentService) private _SegmentService: SegmentService,
        @Inject(Router) private _Router: Router


    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let segments = this._SegmentService.getAll();
        if (segments) {
            return segments;
        }
        else {
            console.log('segments get fail');
            this._Router.navigate(['/']);
            return null;
        }
    }
}
