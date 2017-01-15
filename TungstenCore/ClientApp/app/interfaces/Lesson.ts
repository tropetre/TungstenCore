import { ICourse } from './course';

export interface ILesson {
    Id: string;
    CourseId: string;
    Course: ICourse;
    Classroom: string;
    StartTime: Date;
    EndTime: Date;
}