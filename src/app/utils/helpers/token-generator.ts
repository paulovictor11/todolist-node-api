import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ITokenGenerator } from "../../repositories/helper/token-generator-repository";
import { MissingParamError } from "../errors/missing-param-error";

dotenv.config();

export class TokenGenerator implements ITokenGenerator {
    async generate(id: number): Promise<string> {
        if (!id) {
            throw new MissingParamError("id");
        }

        return jwt.sign(id.toString(), process.env.JWT_SECRET!);
    }

    async validate(token: string): Promise<void> {
        if (!token) {
            throw new MissingParamError("token");
        }

        await jwt.verify(token, process.env.JWT_SECRET!);
    }
}
