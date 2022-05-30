import { Response } from "express";

export class HttpResponse {
    constructor(private response: Response) {}

    serverError() {
        return this.response.status(500).json({
            message: "Internal Server Error",
        });
    }

    unathorized(message: string) {
        return this.response.status(401).json({
            message: message,
        });
    }

    badRequest(message?: string) {
        return this.response.status(400).json({
            message: message ?? "Unexpected Error",
        });
    }

    created() {
        return this.response.status(201).send();
    }

    ok(data?: any) {
        return this.response.send(data);
    }
}
