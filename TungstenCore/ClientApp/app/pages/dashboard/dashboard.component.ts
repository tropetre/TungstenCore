import { Component, Inject, OnInit, trigger, ViewChild, Renderer, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { User } from '../../classes/user';
import { UserAnnouncer } from '../../services/UserAnnouncer';

@Component({
    template: require('./index.html'),
    providers: [UserAnnouncer],
    host: { '[@routeAnimation]': 'true' },
    animations: [
        trigger('routeAnimation', [])
    ]
})
export class Dashboard_Index implements OnInit, AfterViewInit {
    user: User;
    constructor(
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute,
        @Inject(Router) private router: Router,
        @Inject(Renderer) private renderer: Renderer
    ) { 

    }

    ngAfterViewInit() {
        this.router.events.subscribe((val) => {
            
            //console.log(this.LoadingAlert.nativeElement.offsetWidth);

            if (val instanceof NavigationEnd || val instanceof NavigationError) {
                if (val.url === '/dashboard')
                    this.reRoute();
            }
        });
    }

    ngOnInit() {
        //console.log('should load');
        
        this._ActivatedRoute.data.subscribe((data: { user: User }) => {
            this.user = data.user;
            this.reRoute();
            
        });
    }

    protected reRoute() {
        if (!this.user.Roles)
        {
            this.router.navigate(['dashboard', 'student']);
        }
        else
        {
            this.user.Roles.forEach((val, index, obj) => {
                if (val === "teacher") {
                    this.router.navigate(['dashboard', 'teacher']);
                    //console.log('redirected to teacher');
                }
                else if (val === 'admin') {
                    this.router.navigate(['dashboard', 'admin']);
                    //console.log('redirected to admin');
                }
                else {
                    this.router.navigate(['dashboard', 'student']);
                    //console.log('redirected to student');
                }
            });
        }
    }
}