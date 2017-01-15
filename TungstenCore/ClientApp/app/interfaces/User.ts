import { IGroup } from './group';
import { ICourse } from './course';
export interface IUser {
    Id: string;
    Name: string;
    UserName: string;
    Email: string;
    Roles: string[];
    Password: string;
    ConfirmPassword: string;
    OldPassword: string;
    NewPassword: string;
    NewPasswordConfirm: string;
    RememberMe: boolean;
    Courses: ICourse[];
    Groups: IGroup[];
}