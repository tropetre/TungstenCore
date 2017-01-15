import { ICourse } from './course';
export interface ISegment {
    Id: string;
    Name: string;
    Description: string;
    CourseId: string;
    Course: ICourse;
}