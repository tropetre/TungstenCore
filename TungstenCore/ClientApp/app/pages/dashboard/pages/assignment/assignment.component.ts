import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from '../../../../services/upload.service';
import { Assignment } from '../../../../classes/assignment';
import { IAssignment } from '../../../../interfaces/assignment';

@Component({
    template: require('./assignment.component.html')
})
export class AssignmentPage implements OnInit {
    private assignment: IAssignment;
    private assignments: IAssignment[];
    private statusmessage: string;
    private files: File[];

    @ViewChild('fileresult') fileresult: ElementRef;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(UploadService) private _UploadService: UploadService,
        @Inject(Router) private _Router: Router,
        @Inject(Renderer) private _Renderer: Renderer
    ) { 
        _UploadService.progress$.subscribe(
            data => {
                console.log('progress = ' + data);
            });
    };

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { assignment: IAssignment }) => {
                this.assignment = data.assignment;
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { assignments: IAssignment[] }) => {
                console.log(data.assignments);
                this.assignments = data.assignments;
                this.assignment = this.assignments[0] || new Assignment('', '', '');
            }, error => console.error(error), () => {
                if (!this.assignments.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    onChange(event) {
        this.files = event.srcElement.files;
        let filesnames: string;
        for (let i = 0; i < this.files.length; i += 1)
        {
            filesnames = this.files[i].name;
        }
        this._Renderer.setElementAttribute(this.fileresult.nativeElement, 'value', filesnames)
        //this.fileresult.nativeElement
        //console.log(this.files);
        //this._UploadService.makeFileRequest(this.files).subscribe(() => {
        //    console.log('sent');
            //this.picName = fileName;
        //});
    }

    Upload() {
        /*this._UploadService.makeFileRequest(this.files).subscribe((result) => {
            if (result.Id)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';

        })*/
    }
}