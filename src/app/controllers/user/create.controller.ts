import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { IControllerRepository } from "../../repositories/domain/controller-repository";
import { CreateUserUsecase } from "../../usecases/user/create.usecase";
import { EmailValidator } from "../../utils/helpers/email-validator";
import { Encrypter } from "../../utils/helpers/encrypter";

export class CreateUserController implements IControllerRepository {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const prismaUserRepository = new PrismaUserRepository();
            const emailValidator = new EmailValidator();
            const encrypter = new Encrypter();
            const createUserUsecase = new CreateUserUsecase(
                prismaUserRepository,
                emailValidator,
                encrypter
            );

            await createUserUsecase.execute({ name, email, password });

            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message ?? "Unexpected Error",
            });
        }
    }
}
