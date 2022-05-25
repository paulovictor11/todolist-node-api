import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { LoginUsecase } from "../../usecases/auth/login.usecase";
import { Encrypter } from "../../utils/helpers/encrypter";
import { TokenGenerator } from "../../utils/helpers/token-generator";

export class LoginController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;

            const prismaUserRepository = new PrismaUserRepository();
            const encrypter = new Encrypter();
            const tokenGenerator = new TokenGenerator();
            const loginUsecase = new LoginUsecase(
                prismaUserRepository,
                encrypter,
                tokenGenerator
            );

            const result = await loginUsecase.execute({ email, password });
            return response.send(result);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
