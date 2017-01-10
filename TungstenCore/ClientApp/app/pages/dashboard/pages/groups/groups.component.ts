import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './lms/pages/dashboard/pages/groups/groups.component.html'

})
export class GroupsPage {
    constructor( @Inject(Router) private router: Router) { }
    
}