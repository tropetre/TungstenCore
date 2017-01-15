import { IAssignment } from '../interfaces/assignment';
import { ISegment } from '../interfaces/segment';

export class Assignment implements IAssignment{
    Id: string;
    Name: string;
    Description: string;
    SegmentId: string;
    Segment: ISegment;

    constructor(name: string, description: string, segmentid: string) {
        this.Name = name;
        this.Description = description;
        this.SegmentId = segmentid;
    }
}