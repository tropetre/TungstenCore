import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Course } from '../../../../../classes/course';
import { Segment } from '../../../../../classes/segment';
import { SegmentService } from '../../../../../services/segment.service';

@Component({
    template: require('./editsegment.component.html')
})
export class EditSegmentPage implements OnInit {
    private segment: Segment;
    private segments: Segment[];
    private courses: Course[];

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(SegmentService) private _SegmentService: SegmentService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { segment: Segment, courses: Course[] }) => {
                this.segment = data.segment;
                this.courses = data.courses;
            }, error => console.error(error), () => {
                if (!this.segments.length || !this.courses.length)
                    this._Router.navigate(['../']);
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { segments: Segment[], courses: Course[] }) => {
                this.segments = data.segments;
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