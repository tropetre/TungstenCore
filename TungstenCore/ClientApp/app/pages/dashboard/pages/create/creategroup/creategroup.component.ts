import { Component, Inject } from '@angular/core';
import { GroupService } from '../../../../../services/groupservice';
import { IGroup } from '../../../../../interfaces/group';
import { IUser } from '../../../../../interfaces/user';
import { Group } from '../../../../../classes/group';
import { User } from '../../../../../classes/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    template: require('./creategroup.component.html')
})
export class CreateGroup {
    private group: IGroup = new Group('', '');
    user: IUser;
    constructor(
        @Inject(GroupService) private _GroupService: GroupService,
        @Inject(Router) private router: Router,
        @Inject(ActivatedRoute) private _ActivatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this._ActivatedRoute.data.subscribe((data: { user: IUser }) => {
            this.user = data.user;
        });
    }

    Create() {
        this._GroupService.createGroup(this.group).subscribe((group) => { this.group = group }
            , error => console.error(error),
            () => {
                if (this.group.Id)
                {
                    this._GroupService.addUser(this.user.Id, this.group.Id).subscribe((result) => {
                        if (result.Success === true)
                            this.router.navigate(['/dashboard', { outlets: { dashboard: ['group', this.group.Id] } }]);
                        else
                            console.log('Error adding user');
                    })
                }
                else
                    console.log('Error creating group');
            });
    }
}