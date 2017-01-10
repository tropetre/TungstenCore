import { ICourse } from '../interfaces/Course';
import { Segment } from './segment';

export class Course implements ICourse {
    Id: string;
    Name: string;
    Description: string;
    Subject: string;
    Level: string;
    GroupId: string;
    Segments: Segment[];

    constructor(name: string, description: string, subject: string, level: string, groupid: string) {
        this.Name = name;
        this.Description = description;
        this.Subject = subject;
        this.Level = level;
        this.GroupId = groupid;
    }
}
