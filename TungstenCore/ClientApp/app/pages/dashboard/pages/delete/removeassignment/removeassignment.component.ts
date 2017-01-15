import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssignmentService } from '../../../../../services/assignment.service';
import { IAssignment } from '../../../../../interfaces/assignment';
import { Assignment } from '../../../../../classes/assignment';

@Component({
    template: require('./removeassignment.component.html')
})
export class RemoveAssignmentPage implements OnInit {
    private assignment: IAssignment;
    private assignments: IAssignment[];
    private statusmessage: string;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(AssignmentService) private _AssignmentService: AssignmentService,
        @Inject(Router) private _Router: Router
    ) { };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { assignment: IAssignment }) => {
                this.assignment = data.assignment;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { assignments: IAssignment[] }) => {
                this.assignments = data.assignments;
                this.assignment = data.assignments[0] || new Assignment('', '','');

                if (!this.assignments.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    Remove() {
        this._AssignmentService.Delete(this.assignment).subscribe((result) => {
            if (result.Id)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';

        })
    }
}