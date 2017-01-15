import { ILesson } from '../interfaces/lesson';
import { ICourse } from '../interfaces/course';

export class Lesson implements ILesson {
    Id: string;
    CourseId: string;
    Course: ICourse;
    Classroom: string;
    StartTime: Date;
    EndTime: Date;

    constructor(courseid: string, classroom: string) {
        this.CourseId = courseid;
        this.Classroom = classroom;
    }
}