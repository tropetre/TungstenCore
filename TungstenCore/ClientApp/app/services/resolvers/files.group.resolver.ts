import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IFileDetail } from '../../interfaces/file';
import { FileService } from '../file.service';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class GroupFilesResolver implements Resolve<IFileDetail[]> {
    constructor( @Inject(FileService) private _FileService: FileService,
        @Inject(Router) private _Router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFileDetail[]> {
        let files = this._FileService.getGroupFiles();
        if (files) {
            return files;
        } else {
            //this._Router.navigate(['/']);
            return null;
        }
    }

};