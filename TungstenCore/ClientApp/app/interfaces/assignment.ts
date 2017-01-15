import { ISegment } from './segment';
export interface IAssignment{
    Id: string;
    Name: string;
    Description: string;
    SegmentId: string;
    Segment: ISegment;
}