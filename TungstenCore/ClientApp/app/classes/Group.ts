import { IGroup } from '../interfaces/Group';

export class Group implements IGroup {
    Id: string;
    Name: string;
    Description: string;

    constructor(name: string, description: string) {
        this.Name = name;
        this.Description = description;
    }
}