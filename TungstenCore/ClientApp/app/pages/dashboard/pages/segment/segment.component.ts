import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ICourse } from '../../../../interfaces/course';
import { ISegment } from '../../../../interfaces/segment';

@Component({
    template: require('./segment.component.html')
})
export class SegmentPage implements OnInit {
    private segment: ISegment;
    private segments: ISegment[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { segment: ISegment }) => {
                this.segment = data.segment;
                console.log(data.segment);
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { segments: ISegment[] }) => {
                this.segments = data.segments;
                console.log(data.segments);
            }, error => console.error(error), () => {
                if (!this.segments.length)
                    this._Router.navigate(['../']);
            });
        }
    }
}