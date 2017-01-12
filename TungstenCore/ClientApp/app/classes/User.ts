import { Group } from './group';
import { Course } from './course';
export class User {
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
    Courses: Course[];
    Groups: Group[];
    constructor(
        username: string,
        password: string,
        name: string,
        email: string,
        roles: string[]
    ) {

        this.UserName = username;
        this.Password = password;
        this.RememberMe = false;
        this.Name = name;
        this.Email = email;
        this.Roles = roles;
    }
}