import { ISegment } from '../interfaces/segment';
import { ICourse } from '../interfaces/course';
export class Segment implements ISegment{
    Id: string;
    Name: string;
    Description: string;
    CourseId: string;
    Course: ICourse;

    constructor(name: string, description: string, courseid: string) {
        this.Name = name;
        this.Description = description;
        this.CourseId = courseid;
    }
}