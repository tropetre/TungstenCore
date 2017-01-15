import { ICourse } from '../interfaces/course';
import { ISegment } from '../interfaces/segment';
import { ILesson } from '../interfaces/lesson';
import { IUser } from '../interfaces/user';

export class Course implements ICourse {
    Id: string;
    Name: string;
    Description: string;
    Subject: string;
    Level: string;
    GroupId: string;
    Segments: ISegment[];
    Lessons: ILesson[];
    Participants: IUser[];

    constructor(name: string, description: string, subject: string, level: string, groupid: string) {
        this.Name = name;
        this.Description = description;
        this.Subject = subject;
        this.Level = level;
        this.GroupId = groupid;
        this.Segments = null;

    }
}
