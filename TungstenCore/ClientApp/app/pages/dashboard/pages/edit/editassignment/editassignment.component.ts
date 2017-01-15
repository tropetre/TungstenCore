import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssignmentService } from '../../../../../services/assignment.service';
import { IAssignment } from '../../../../../interfaces/assignment';

@Component({
    template: require('./editassignment.component.html')
})
export class EditAssignmentPage implements OnInit {
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