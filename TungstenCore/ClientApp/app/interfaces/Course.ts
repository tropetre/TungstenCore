import { ISegment } from './segment';
import { ILesson } from './lesson';
import { IUser } from './user';
export interface ICourse {
    Id: string;
    Description: string;
    Subject: string;
    Level: string;
    GroupId: string;
    Segments: ISegment[];
    Lessons: ILesson[];
    Participants: IUser[];
}