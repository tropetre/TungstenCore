import { Component, OnInit, ElementRef, Inject, ViewChild, AfterViewChecked, animate, trigger, style, transition, state } from '@angular/core';
import { ChangeDetectorRef, Renderer } from '@angular/core';
import { GroupService } from './services/GroupService';
import { MembershipService } from './services/membership.service';
import { Login } from './components/Login/Login';
import { User } from './classes/User';
import { UserAnnouncer } from './services/UserAnnouncer';
import { Subscription } from 'rxjs/Subscription';
import { WindowSize } from './services/windowsize';

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

    constructor( @Inject(ElementRef) private elementRef: ElementRef,
        @Inject(MembershipService) public membershipService: MembershipService,
        @Inject(ChangeDetectorRef) public changeDetectorRef: ChangeDetectorRef,
        @Inject(UserAnnouncer) private _UserAnnouncer: UserAnnouncer,
        @Inject(Renderer) private renderer: Renderer,
        @Inject(WindowSize) private windowSize: WindowSize,
        private thisref: ElementRef

    ) {
        this.user = this.membershipService.getLoggedInUser() || new User('', '', '', '', []);
        this.isuserloggedin = this.isUserLoggedIn();

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
            if (this.NavMenu)
            {
                this.renderer.setElementClass(this.NavMenu.nativeElement, 'offcanvas', (size <= 768));
                if (this.isuserloggedin) {
                    this.renderer.setElementStyle(this.thisref.nativeElement, 'padding-right', '300');
                }
            }
        });

        //this.renderer.setElementClass(this.NavMenu.nativeElement, 'offcanvas', (window.innerWidth <= 768));

        this.changeDetectorRef.detectChanges();
    }

    navmenuclass() {
        if (window.innerWidth <= 768)
            return true;

        return false;
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