import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../infra/database/prisma/repositories/prisma-user-repository";
import { HttpResponse } from "../../presentation/helpers/http-response";
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

            return new HttpResponse(response).created();
        } catch (err: any) {
            return new HttpResponse(response).badRequest(err.message);
        }
    }
}
