import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileService } from '../../../../services/file.service';
import { Assignment } from '../../../../classes/assignment';
import { IFileDetail } from '../../../../interfaces/file';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Component({
    template: require('./file.component.html')
})
export class FilePage implements OnInit, AfterViewChecked {
    private filedetail: IFileDetail;
    private filedetails: IFileDetail[];
    private statusmessage: string;
    private files: File[];
    private file: File;
    private publicfiles: IFileDetail[];
    private loaded: boolean = false;
    fileresultstring: string;
    @ViewChild('fileinput') fileinput: ElementRef;
    @ViewChild('fileresult') fileresult: ElementRef;
    @ViewChild('downloadbutton') downloadbutton: ElementRef;
    FileUploaderOptions: FileUploaderOptions = {
        allowedFileType: ['txt', 'doc'],
        maxFileSize: 2000,
        url: 'file/upload'
    };
    public uploader: FileUploader = new FileUploader(this.FileUploaderOptions);
    private progress: number;

    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(FileService) private _FileService: FileService,
        @Inject(Router) private _Router: Router,
        @Inject(Renderer) private _Renderer: Renderer
    ) {
        _FileService.progress$.subscribe(
            data => {
                this.progress = data;
                console.log('progress = ' + data);
            });
    };

    ngAfterViewChecked() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id && this.loaded === false && this.downloadbutton)
        {
           /* this._FileService.Download(this.filedetail.FileId).subscribe((result) => {
                let newwindow = window.open('', 'Text', 'width=20em,height=10em,toolbar=0,menubar=0,scrollbars=no');
                //let blook = new Blob([result]);
                //console.log(blook);
                //this._Renderer.setElementAttribute(this.downloadbutton.nativeElement, 'href', "data:text/csv;base64," + URL.createObjectURL(result));
            });
            this.loaded = true;*/
        }
    }

    ngOnInit() {
        let id = this._ActivatedRoute.snapshot.params['id'];
        if (id) {
            this._ActivatedRoute.data.subscribe((data: { file: IFileDetail, publicfiles: IFileDetail[] }) => {
                this.filedetail = data.file;
                this.publicfiles = data.publicfiles;
                console.log(data.file);
                
            });
        }
        else {
            this._ActivatedRoute.data.subscribe((data: { files: IFileDetail[], publicfiles: IFileDetail[] }) => {
                this.filedetails = data.files;
                this.publicfiles = data.publicfiles;

                if (!this.filedetails)
                    this._Router.navigate(['../']);
            });
        }
    }

    onChange(event: any) {
        let inputEl: HTMLInputElement = this.fileinput.nativeElement;
        let fileCount: number = inputEl.files.length;
        this.files = new Array<File>();
        let filesnames: string;

        for (let i = 0; i < fileCount; i += 1) {
            this.files.push(inputEl.files.item(i));
            filesnames += inputEl.files.item(i).name + ' | ';
        }

        for (let i = 0; i < this.files.length; i += 1) {
            filesnames = this.files[i].name;
            console.log(this.files[i]);
        }

        this._Renderer.setElementAttribute(this.fileresult.nativeElement, 'value', filesnames)

        console.log(this.files);
        //this.uploader.addToQueue(this.files);
    }

    Upload() {
        this._FileService.Upload(this.files, '').subscribe((result) => {
            console.log(result);
            if (result.Id)
                this._Router.navigate(['../']);
            else
                this.statusmessage = 'failed try again!';

        });
    }

    Download() {
        this._FileService.Download(this.filedetail.FileId).subscribe((result) => {
            let newwindow = window.open('', 'Text', 'width=20em,height=10em,toolbar=0,menubar=0,scrollbars=no');
            newwindow.document.write(result);
        });
    }
}