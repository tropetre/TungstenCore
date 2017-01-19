import { ICourse } from './course';
import { IUserGroup } from './usergroup';

export interface IGroup {
    Id: string;
    Name: string;
    Description: string;
    Participants: any[];
    Courses: ICourse[];
}