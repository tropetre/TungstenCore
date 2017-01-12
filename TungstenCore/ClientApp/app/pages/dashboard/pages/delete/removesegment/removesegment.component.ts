import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SegmentService } from '../../../../../services/segment.service';
import { Segment } from '../../../../../classes/segment';

@Component({
    template: require('./removesegment.component.html')
})
export class RemoveSegmentPage implements OnInit {
    private segment: Segment;
    private segments: Segment[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(SegmentService) private _SegmentService: SegmentService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { segment: Segment }) => {
                this.segment = data.segment;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { segments: Segment[] }) => {
                this.segments = data.segments;
            }, error => console.error(error), () => {
                if (!this.segments.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Remove() {
        this._SegmentService.Delete(this.segment.Id).subscribe((segment) => {
            this.segment = segment;
        }, error => console.error(error), () => {
            this._Router.navigate(['../']);
        });
    }
}