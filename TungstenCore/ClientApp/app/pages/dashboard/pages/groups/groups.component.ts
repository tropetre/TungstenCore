import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: require('./groups.component.html')

})
export class GroupsPage {
    constructor( @Inject(Router) private router: Router) { }
    
}