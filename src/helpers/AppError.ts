export class AppError extends Error {
    public status
    constructor(status: number, message: string,) {
        super(message);
        this.status = status;
    }
}

