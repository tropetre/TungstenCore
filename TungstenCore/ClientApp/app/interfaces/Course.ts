import { Segment } from '../classes/segment';
export interface ICourse {
    Id: string;
    Name: string;
    Description: string;
    Subject: string;
    Level: string;
    GroupId: string;
    Segments: Segment[];
}