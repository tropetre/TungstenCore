import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileService } from '../../../../services/file.service';
import { Assignment } from '../../../../classes/assignment';
import { IAssignment } from '../../../../interfaces/assignment';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Component({
    template: require('./assignment.component.html')
})
export class AssignmentPage implements OnInit {
    private assignment: IAssignment;
    private assignments: IAssignment[];
    private statusmessage: string;
    private files: File[];
    private file: File;
    fileresultstring: string;
    @ViewChild('fileinput') fileinput: ElementRef;
    @ViewChild('fileresult') fileresult: ElementRef;
    FileUploaderOptions: FileUploaderOptions = {
        allowedFileType: ['txt', 'doc'],
        maxFileSize: 2000,
        url: 'file/upload'
    };
    public uploader: FileUploader = new FileUploader(this.FileUploaderOptions);
    

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(FileService) private _FileService: FileService,
        @Inject(Router) private _Router: Router,
        @Inject(Renderer) private _Renderer: Renderer
    ) { 
        _FileService.progress$.subscribe(
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
            }, error => console.error(error), () => {
                if (!this.assignments.length)
                    this._Router.navigate(['../']);
            });
        }
    }

    onChange(event: any) {
        let inputEl: HTMLInputElement = this.fileinput.nativeElement;
        let fileCount: number = inputEl.files.length;
        this.files = new Array<File>();
        let filesnames: string;

        for (let i = 0; i < fileCount; i += 1)
        {
            this.files.push(inputEl.files.item(i));
            filesnames += inputEl.files.item(i).name + ' | ';
        }
        
        for (let i = 0; i < this.files.length; i += 1) {
            filesnames = this.files[i].name;
            console.log(this.files[i]);
        }

        this._Renderer.setElementAttribute(this.fileresult.nativeElement, 'value', filesnames)

        console.log(this.files);
        this.uploader.addToQueue(this.files);
            
        
        //this.files = inputEl.files.item;

        /*
        this.files = event.srcElement.files;
        console.log(this.files);
        if (event.srcElement.files && event.srcElement.files[0])
        {
            let renderer: Renderer = this._Renderer;
            let fileresultstring = this.fileresultstring;
            var reader = new FileReader();

            reader.onload = function (e: any) {
                //renderer.setText(fileresult.nativeElement, e.currentTarget.result);
                
            };
            
            reader.readAsText(event.target.files[0]);
            /*
            reader.onload = (e: any) => {
                // show preview value = e.target.result
            };*/

            /*
            this.files = event.srcElement.files;
            let filesnames: string;
            for (let i = 0; i < this.files.length; i += 1) {
                filesnames = this.files[i].name;
                console.log(this.files[i]);
            }

            this._Renderer.setElementAttribute(this.fileresult.nativeElement, 'value', filesnames)*/
        //}
    }

    Upload() {
        console.log(this.files);
        
        this._FileService.Upload(this.files, this.assignment.Id).subscribe((result) => {
            console.log(result);
            if (result.Id)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';

        });
    }
}