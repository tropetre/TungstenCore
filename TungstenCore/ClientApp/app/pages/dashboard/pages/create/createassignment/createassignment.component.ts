import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../../../../services/assignment.service';
import { OperationResult } from '../../../../../classes/operationResult';
import { ISegment } from '../../../../../interfaces/segment';
import { IAssignment } from '../../../../../interfaces/assignment';
import { Assignment } from '../../../../../classes/assignment';

@Component({
    template: require('./createassignment.component.html')
})
export class CreateAssignmentPage implements OnInit {
    private assignment: IAssignment = new Assignment('', '', '',);
    private segments: ISegment[];
    private statusmessage: string;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(AssignmentService) private _AssignmentService: AssignmentService,
        @Inject(Router) private _Router: Router
    )
    { }

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this.assignment.SegmentId = id;
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { segments: ISegment[] }) => {
                this.segments = data.segments;
            }, error => console.error(error), () => {
                if (!this.segments.length)
                    this._Router.navigate(['/dashboard']);
            });
        }
    }

    create() {
        console.log('sub');
        // TODO: submit created assignment and uploadfile
        this._AssignmentService.Create(this.assignment).subscribe((result) => {
            if (result.Id)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';
        });
    }
}