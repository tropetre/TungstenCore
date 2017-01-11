export class OperationResult {
    succeeded: boolean;
    message: string;

    constructor(succeeded: boolean, message: string) {
        this.succeeded = succeeded;
        this.message = message;
    }
}