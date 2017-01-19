import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { DataService } from './data.service';
import { IFileDetail } from '../interfaces/file';

import 'rxjs/rx';

@Injectable()
export class FileService {
    private _AssignmentGetAllAPI: string = '/file/getall';
    private _AssignmentGetPublicAPI: string = '/file/GetPublicFiles';
    private _AssignmentGetByIdAPI: string = '/file/GetById';
    private _AssignmentCreateAPI: string = '/file/Upload';
    private _AssignmentDeleteAPI: string = '/file/Delete';
    private _AssignmentEditAPI: string = '/file/Download';

    progress$: any;
    progress: number;
    progressObserver: any;

    constructor( @Inject(DataService) private _DataService: DataService) {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer;
        }).share();
    }

    getAll(): Observable<IFileDetail[]> {
        this._DataService.set(this._AssignmentGetAllAPI);
        return this._DataService.get()
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractDatalist);
    }

    getGroupFiles(): Observable<IFileDetail[]> {
        this._DataService.set(this._AssignmentGetPublicAPI);
        return this._DataService.get()
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractDatalist);
    }

    getById(id: string): Observable<IFileDetail> {
        this._DataService.set(this._AssignmentGetByIdAPI);
        return this._DataService.post({ Id: id })
            //.do(this.logData)
            .catch(this.handleError)
            .map(this.extractData);
    }

    Upload(files: File[], assignmentId: string) {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('AssignmentId', assignmentId);
            for (let i = 0; i < files.length; i++) {
                formData.append("File[]", files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);

                this.progressObserver.next(this.progress);
            };
            xhr.open('POST', 'file/upload', true);
            var serverFileName = xhr.send(formData);
            return serverFileName;
        });
    }

    Delete(assignment: IFileDetail) {
        this._DataService.set(this._AssignmentDeleteAPI);
        return this._DataService.post(assignment)
            //.do(this.logData)
            .catch(this.handleError);
    }

    Download(fileid: string) {
        //var reader = new FileReader();
        /*this.pservice.downloadfile(this.rundata.name, type)
            .subscribe(res => reader.readAsDataURL(res),
            error => console.log("Error downloading the file."),
            () => console.log('Completed file download.'));
        
        reader.onloadend = function (e) {
            window.open(reader.result, 'Text', 'width=20em,height=10em,toolbar=0,menubar=0,scrollbars=no');
        }*/
        this._DataService.set(this._AssignmentEditAPI);
        return this._DataService.post({ Id: fileid })
            //.do(this.logData)
            .catch(this.handleError)
            .map((result) => { return result });
    }

    private logData(data) {
        console.log(data);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractDatalist(res) {
        let body = <IFileDetail[]>res;
        return body || [];
    }

    private extractData(res) {
        let body = <IFileDetail>res;
        return body || null;
    }
}