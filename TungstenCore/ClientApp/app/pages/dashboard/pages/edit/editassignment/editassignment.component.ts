import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssignmentService } from '../../../../../services/assignment.service';
import { IAssignment } from '../../../../../interfaces/assignment';
import { ISegment } from '../../../../../interfaces/segment';
import { Assignment } from '../../../../../classes/assignment';

@Component({
    template: require('./editassignment.component.html')
})
export class EditAssignmentPage implements OnInit {
    private assignment: IAssignment;
    private assignments: IAssignment[];
    private segments: ISegment[];
    private statusmessage: string;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(AssignmentService) private _AssignmentService: AssignmentService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { assignment: IAssignment, segments: ISegment[] }) => {
                this.assignment = data.assignment;
                this.segments = data.segments;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { assignments: IAssignment[], segments: ISegment[] }) => {
                this.assignments = data.assignments;
                this.assignment = this.assignments[0] || new Assignment('', '', '');
                this.segments = data.segments;
            }, error => console.error(error), () => {

                if (!this.assignments.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Save() {
        this._AssignmentService.Edit(this.assignment).subscribe((result) => {
            if (result.Id)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';
        });
    }
}