import { Response } from "express";
import { ServerError } from "../errors/server-error";
import { Unathorized } from "../errors/unathorized";

export class HttpResponse {
    constructor(private response: Response) {}

    serverError() {
        return this.response.status(500).json({
            message: new ServerError(),
        });
    }

    unathorized() {
        return this.response.status(401).json({
            message: new Unathorized(),
        });
    }

    badRequest(message?: string) {
        return this.response.status(400).json({
            message: message ?? "Unexpected Error",
        });
    }

    created() {
        return this.response.sendStatus(201);
    }

    ok(data?: any) {
        return this.response.send(data);
    }
}
