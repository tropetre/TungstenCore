import { IUser } from './user';
import { IAssignment } from './assignment';


export interface IFileDetail {
    Id: string;
    FileName: string;
    Extension: string;
    OwnerId: string;
    Owner: IUser;
    AssignmentId: string;
    Assignment: IAssignment;
    FileId: string;
}