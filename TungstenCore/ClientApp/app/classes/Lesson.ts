import { ILesson } from '../interfaces/lesson';

export class Lesson implements ILesson {
    Id: string;
    CourseId: string;
    Classroom: string;
    StartTime: Date;
    EndTime: Date;

    constructor(courseid: string, classroom: string) {
        this.CourseId = courseid;
        this.Classroom = classroom;
    }
}