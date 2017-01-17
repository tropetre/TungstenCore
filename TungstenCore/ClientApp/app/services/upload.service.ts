import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

@Injectable()
export class UploadService {
    progress$: any;
    progress: any;
    progressObserver: any;
    constructor(
        @Inject(Http) private _Http: Http
    ) {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer;
        }).share();
    }

    makeFileRequest(files: File[], assignmentId: string): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('AssignmentId', assignmentId);
            for (let i = 0; i < files.length; i++) {
                formData.append("File[]", files[i], files[i].name);
            }
            console.log(files);
            //this._Http.
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
            console.log(formData);
            xhr.open('POST', 'file/upload', true);
            var serverFileName = xhr.send(formData);
            return serverFileName;
        });
    }
}