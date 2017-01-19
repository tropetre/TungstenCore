import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IFileDetail } from '../../interfaces/file';
import { FileService } from '../file.service';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class FileResolver implements Resolve<IFileDetail> {
    constructor( @Inject(FileService) private _FileService: FileService,
        @Inject(Router) private _Router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFileDetail> {
        if (route.params['id']) {
            let file = this._FileService.getById(route.params['id']);
            if (file) {
                return file;
            } else {
                this._Router.navigate(['/']);
                return null;
            }
        }
        else {
            console.log('no id param');
            this._Router.navigate(['/']);
            return null;
        }
    }
};