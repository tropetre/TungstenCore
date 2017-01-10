import { Injectable, Inject } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { HomePageModel } from '../../classes/homepagemodel';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class homepageresolver implements Resolve<HomePageModel> {

    constructor(
        @Inject(Http) private http: Http,
        @Inject(Router) private _Router: Router
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomePageModel> {
        let Homepage: Observable<HomePageModel>;

        Homepage = this.http.get('/Account/GetHomePage').map((result: Response) => {
            return result.json();
        }).first();

        if (Homepage) {
            return Homepage;
        } else {
            this._Router.navigate(['/']);
            return null;
        }

    }
}