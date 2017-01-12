import { Component, Inject, OnInit } from '@angular/core';
import { SegmentService } from '../../../../../services/segment.service';
import { Segment } from '../../../../../classes/segment';
import { Course } from '../../../../../classes/course';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    template: require('./createsegment.component.html')
})
export class CreateSegmentPage implements OnInit {
    private segment: Segment;
    private statusmessage: string;
    private courses: Course[];

    constructor(
        @Inject(SegmentService) private _SegmentService: SegmentService,
        @Inject(Router) private _Router: Router,
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this.segment.CourseId = id;
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { courses: Course[] }) => {
                this.courses = data.courses;
            }, error => console.error(error), () => {

                if (!this.courses.length)
                    this._Router.navigate(['/dashboard']);
            });
        }
    }

    Create() {
        this._SegmentService.Create(this.segment).subscribe((result) => {
            if (result.Id)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';
        });
    }
}