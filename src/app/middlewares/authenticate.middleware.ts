import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../presentation/helpers/http-response";
import { TokenGenerator } from "../utils/helpers/token-generator";

export class Authencicate {
    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const { authorization } = request.headers;
            if (!authorization) {
                return new HttpResponse(response).unathorized(
                    "No token provided"
                );
            }

            const parts = authorization.split(" ");
            if (parts.length !== 2) {
                return new HttpResponse(response).unathorized("Token Error");
            }

            const [scheme, token] = parts;
            if (!/^Bearer$/i.test(scheme)) {
                return new HttpResponse(response).unathorized(
                    "Token Malformatted"
                );
            }

            const tokenGenerator = new TokenGenerator();
            await tokenGenerator.validate(token);

            return next();
        } catch (err: any) {
            return new HttpResponse(response).unathorized("Invalid Token");
        }
    }
}
