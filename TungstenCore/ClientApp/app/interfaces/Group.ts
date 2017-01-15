import { ICourse } from './course';
import { IUser } from './user';

export interface IGroup {
    Id: string;
    Name: string;
    Description: string;
    Participants: IUser[];
    Courses: ICourse[];
}