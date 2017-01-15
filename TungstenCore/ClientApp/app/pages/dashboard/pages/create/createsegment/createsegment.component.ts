import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SegmentService } from '../../../../../services/segment.service';
import { ISegment } from '../../../../../interfaces/segment';
import { Segment } from '../../../../../classes/segment';
import { ICourse } from '../../../../../interfaces/course';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    template: require('./createsegment.component.html')
})
export class CreateSegmentPage implements OnInit {
    public segment: ISegment = new Segment('', '', '');
    private statusmessage: string;
    private courses: ICourse[];
    
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
            this._ActivatedRoute.data.subscribe((data: { courses: ICourse[] }) => {
                this.courses = data.courses;
            }, error => console.error(error), () => {

                if (!this.courses.length)
                    this._Router.navigate(['/dashboard']);
            });
        }
    }

    changed() {
        console.log(this.segment.CourseId);
    }

    Create() {
        console.log(this.segment.CourseId);
        this._SegmentService.Create(this.segment).subscribe((result) => {
            console.log(result);
            if (result.Id)
                this._Router.navigate(['/dashboard']);
            else
                this.statusmessage = 'failed try again!';
        });
    }
}