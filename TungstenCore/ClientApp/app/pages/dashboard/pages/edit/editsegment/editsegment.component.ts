import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ICourse } from '../../../../../interfaces/course';
import { ISegment } from '../../../../../interfaces/segment';
import { Segment } from '../../../../../classes/segment';
import { SegmentService } from '../../../../../services/segment.service';

@Component({
    template: require('./editsegment.component.html')
})
export class EditSegmentPage implements OnInit {
    private segment: ISegment;
    private segments: ISegment[];
    private courses: ICourse[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(SegmentService) private _SegmentService: SegmentService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { segment: ISegment, courses: ICourse[] }) => {
                this.segment = data.segment;
                this.courses = data.courses;
            }, error => console.error(error), () => {
                if (!this.segments.length || !this.courses.length)
                    this._Router.navigate(['../']);
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { segments: ISegment[], courses: ICourse[] }) => {
                this.segments = data.segments;
                this.segment = this.segments[0] || new Segment('','','');
                this.courses = data.courses;
            }, error => console.error(error), () => {
                if (!this.segments.length || !this.courses.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Save() {
        this._SegmentService.Edit(this.segment).subscribe((segment) => {
            this.segment = segment;
        }, error => console.error(error), () => {
                this._Router.navigate(['../']);
        });
    }
}