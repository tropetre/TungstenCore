import { IGroup } from '../interfaces/Group';
import { ICourse } from '../interfaces/course';
import { IUser } from '../interfaces/user';
import { IUserGroup } from '../interfaces/usergroup';

export class Group implements IGroup {
    Id: string;
    Name: string;
    Description: string;
    Participants: any[];
    Courses: ICourse[];

    constructor(name: string, description: string) {
        this.Name = name;
        this.Description = description;
    }
}