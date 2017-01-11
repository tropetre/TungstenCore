import { Component, Inject, OnInit, animate, trigger, style, transition, state } from '@angular/core';
import { Router, Resolve, ActivatedRoute } from '@angular/router';
import { MembershipService } from '../../../../services/membership.service';
import { UserAnnouncer } from '../../../../services/userannouncer';
import { User } from '../../../../classes/user';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template: require('./homepage.component.html'),
    host: { '[@routeAnimation]': 'true' },
    styles: [':host { display: block; position: absolute; }'],//[':host { width: 300px; display: block; position: absolute; }'],
    animations: [
        trigger('routeAnimation', [])
    ]
})
export class HomePage implements OnInit {
    user: User;
    subscription: Subscription;
    constructor(
        @Inject(Router) private router: Router,
        @Inject(MembershipService) private _membershipService: MembershipService,
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this._ActivatedRoute.data.subscribe((data: { user: User }) => {
            this.user = data.user;

            let userroles = this._membershipService.getLoggedInUser().Roles;

            console.log('should load');

            if (!userroles.length)
                this.router.navigate(['student']);

            userroles.forEach((val, index, obj) => {
                if (val == "Teacher") {
                    this.router.navigate(['teacher']);
                    console.log('redirected to teacher');
                }
                else if (val == 'Admin') {
                    this.router.navigate(['admin']);
                    console.log('redirected to admin');
                }
                else {
                    this.router.navigate(['student']);
                    console.log('redirected to student');
                }
            });
        }, error => console.error(error), () => {
            

        });
    }



}