import { IUser } from './user';
import { IGroup } from './group';
export interface IUserGroup {
    ApplicationUserId: string;
    ApplicationUser: IUser;
    GroupId: string;
    Group: IGroup;
}