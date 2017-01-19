import { Component, OnInit, ElementRef, Inject, ViewChild, AfterViewChecked, animate, trigger, style, transition, state } from '@angular/core';
import { ChangeDetectorRef, Renderer } from '@angular/core';
import { GroupService } from './services/GroupService';
import { MembershipService } from './services/membership.service';
import { Login } from './components/Login/Login';
import { User } from './classes/User';
import { UserAnnouncer } from './services/UserAnnouncer';
import { Subscription } from 'rxjs/Subscription';
import { WindowSize } from './services/windowsize';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'lms-index',
    template: require('./index.html'),
    providers: [GroupService, UserAnnouncer],
    host: { '[@routeAnimation]': 'true' },
    animations: [
        trigger('routeAnimation', [
            state('*', style({ opacity: 1 })),
            state('void', style({ position: 'absolute' })),
            transition('void => *', [
                style({ opacity: 0, position: 'absolute' }),
                animate('0.5s')
            ]),
            transition('* => void',
                animate('0.5s', style({
                    opacity: 0, position: 'absolute'
                }))
            )
        ])
    ]
})
export class IndexPage implements OnInit, AfterViewChecked {
    isuserloggedin: boolean;
    public user: User;
    @ViewChild(Login) LoginView: Login;
    subscription: Subscription;
    @ViewChild('navmenu') NavMenu: ElementRef;
    @ViewChild('topnav') TopNav: ElementRef;
    @ViewChild('bodycontent') BodyContent: ElementRef;
    @ViewChild('logo') Logo: ElementRef;
    @ViewChild('logos') Logo2: ElementRef;
    @ViewChild('routeroutlet') routeroutlet: ElementRef;
    navopen: boolean = false;

    constructor( @Inject(ElementRef) private elementRef: ElementRef,
        @Inject(MembershipService) public membershipService: MembershipService,
        @Inject(ChangeDetectorRef) public changeDetectorRef: ChangeDetectorRef,
        @Inject(UserAnnouncer) private _UserAnnouncer: UserAnnouncer,
        @Inject(Renderer) private renderer: Renderer,
        @Inject(WindowSize) private windowSize: WindowSize,
        @Inject(Router) private _Router: Router

    ) {
        this.user = this.membershipService.getLoggedInUser() || new User('', '', '', '', []);
        this.isuserloggedin = (document.getElementById('isloggedin').attributes.getNamedItem("value").nodeValue === 'true');
        _Router.events.subscribe(event => {
            if (this.isuserloggedin) {
                if (event instanceof NavigationStart) {
                    renderer.setElementClass(this.Logo.nativeElement, 'path', true);
                    renderer.setElementClass(this.Logo2.nativeElement, 'path', true);
                }
                else if (event instanceof NavigationEnd) {
                    setTimeout(() => {
                        renderer.setElementClass(this.Logo.nativeElement, 'path', false);
                        renderer.setElementClass(this.Logo2.nativeElement, 'path', false);
                    }, 500);
                }
            }
        });

        
    }

    
    
    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }

    logout(): void {
        this.membershipService.logout()
            .subscribe(res => {
                localStorage.removeItem('user');
            },
            error => console.error('Error: ' + error),
            () => {
                this.isuserloggedin = false;
                this.user = new User('', '', '', '', []);
            });
    }
    
    ngAfterViewChecked() {
        if (this.LoginView && this.LoginView.LoggedIn && this.isuserloggedin != this.LoginView.LoggedIn)
        {
            this.isuserloggedin = this.LoginView.LoggedIn;
        }

        this.windowSize.width$.subscribe(size => {
            if (this.NavMenu) {
               // this.renderer.setElementClass(this.NavMenu.nativeElement, 'right-nav-hide', (size <= 768 && this.isuserloggedin && !this.navopen));
               // this.renderer.setElementClass(this.NavMenu.nativeElement, 'right-nav-hide', (size <= 768 && this.navopen));
               // this.renderer.setElementClass(this.NavMenu.nativeElement, 'right-nav-show', (size > 768 && !this.navopen));

            }
            if (this.BodyContent && this.NavMenu) {
                if (this.isuserloggedin)
                {
                    if (size > 768)
                    {
                        this.renderer.setElementStyle(this.NavMenu.nativeElement, 'transform', this.navopen ? 'translateX(0px)' : 'translateX(0px)');
                        this.renderer.setElementStyle(this.BodyContent.nativeElement, 'transform', this.navopen ? 'translateX(0px)' : 'translateX(0px)');
                        this.renderer.setElementStyle(this.routeroutlet.nativeElement, 'padding-right', '175px');
                    }
                    else
                    {
                        this.renderer.setElementStyle(this.BodyContent.nativeElement, 'transform', this.navopen ? 'translateX(-150px)' : 'translateX(0px)');
                        this.renderer.setElementStyle(this.NavMenu.nativeElement, 'transform', this.navopen ? 'translateX(0px)' : 'translateX(150px)');
                        this.renderer.setElementStyle(this.routeroutlet.nativeElement, 'padding-right', '15px');
                    }
                }
                else {
                    if (size > 768) {
                        this.renderer.setElementStyle(this.BodyContent.nativeElement, 'transform', 'translateX(0px)');
                        this.renderer.setElementStyle(this.NavMenu.nativeElement, 'transform', 'translateX(150px)');
                        this.renderer.setElementStyle(this.routeroutlet.nativeElement, 'padding-right', '0px');
                        this.renderer.setElementStyle(this.routeroutlet.nativeElement, 'padding-right', '15px');

                    }
                    else {
                        this.renderer.setElementStyle(this.NavMenu.nativeElement, 'transform', 'translateX(150px)');
                        this.renderer.setElementStyle(this.BodyContent.nativeElement, 'transform', !this.navopen ? 'translateX(0px)' : 'translateX(-150px)');
                        this.renderer.setElementStyle(this.routeroutlet.nativeElement, 'padding-right', '15px');

                    }
                }
                //this.hideShownav();

                //this.renderer.setElementStyle(this.BodyContent.nativeElement, 'transform', this.navopen ? 'translateX(0px)' : 'translateX(-150px)');

               // this.renderer.setElementStyle(this.BodyContent.nativeElement, 'padding-right', this.isuserloggedin && (size > 768) ? '150px' : '0px');
              //  this.renderer.animate(this.NavMenu.nativeElement, { styles: [] }, [], 1, 0, 'ease');
            }
            if (this.BodyContent && size < 768 && this.isuserloggedin) {

                //this.renderer.setElementClass(this.NavMenu.nativeElement, 'right-nav-hide', true);
            }
            else if (size <= 768 && this.navopen) {
                //this.renderer.setElementStyle(this.NavMenu.nativeElement, 'transform', 'translateX(0px)');
                //this.renderer.setElementStyle(this.BodyContent.nativeElement, 'transform', 'translateX(-150px)');
            }
                
        });

        this.changeDetectorRef.detectChanges();
        //this.renderer.setElementClass(this.NavMenu.nativeElement, 'offcanvas', (window.innerWidth <= 768));
    }

    bodyStyle() {/*
        if (window.innerWidth > 768 && this.isuserloggedin) {
            return {
                'padding-right': '315px'
            }
        } else {
            return {
                'padding-right': '15px'
            }
        }*/
    }

    isTeacher() {
        return (this.user.Roles[0].toLowerCase() === 'teacher');
    }

    isStudent() {
        return (this.user.Roles[0].toLowerCase() === 'student');
    }

    isAdmin() {
        return (this.user.Roles[0].toLowerCase() === 'admin');
    }

    navmenuclass() {
        return false;//(window.innerWidth <= 768);
    }

    hideShownav() {
        this.renderer.setElementStyle(this.NavMenu.nativeElement, 'transform', this.navopen ? 'translateX(150px)' : 'translateX(0px)');
        this.renderer.setElementStyle(this.BodyContent.nativeElement, 'transform', this.navopen ? 'translateX(0px)' : 'translateX(-150px)');
        
        this.navopen = !this.navopen;
    }

    toggleNavMenu() {
        if (window.innerWidth <= 768 && this.isuserloggedin) {
            //this.renderer.setElementClass(this.NavMenu.nativeElement, 'right-nav-hide', (this.navopen === true));
            this.hideShownav();
            
        }
    }

    userUpdated(updatedUser: User) {
        
        console.log(updatedUser);
        this.user = updatedUser;
        //this.user.Roles[0] = this.user.Roles[0] === '' ? 'student' : this.user.Roles[0].toLowerCase();
    }

    //console.log(this.isuserloggedin);

    ngOnInit(): void {
        // this is the antiforgery token DON't REMOVE
        console.log('Anti Forgery Token passed from the razor Home/Index View');
        //console.log(document.getElementById('antiForgeryForm').childNodes[1].attributes.getNamedItem("value").nodeValue);
        
        this.subscription = this._UserAnnouncer.userAnnounced.subscribe(
            user => {
                //console.log('user from lms.component event:')
                //console.log(user);
                
                this.user = user;
                //this.user.Roles[0] = this.user.Roles[0] == '' ? 'student' : this.user.Roles[0].toLowerCase();

            }
        );
    }
}
