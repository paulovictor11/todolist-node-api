import { User } from "../../../domain/user";
import { IUserRepository } from "../../repositories/domain/user-repository";
import { IEmailValidatorRepository } from "../../repositories/helper/email-validator-repository";
import { IEncrypterRepository } from "../../repositories/helper/encrypter-repository";
import { InvalidParamError } from "../../utils/errors/invalid-param-error";
import { MissingParamError } from "../../utils/errors/missing-param-error";

interface ICreateUserUsecaseRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUsecase {
    constructor(
        private userRepository: IUserRepository,
        private emailValidator: IEmailValidatorRepository,
        private encrypter: IEncrypterRepository
    ) {}

    async execute({
        name,
        email,
        password,
    }: ICreateUserUsecaseRequest): Promise<void> {
        if (!name) {
            throw new MissingParamError("name");
        }

        if (!this.emailValidator.isValid(email)) {
            throw new InvalidParamError("email");
        }

        if (!password) {
            throw new MissingParamError("password");
        }

        const isUserAlreadyExists = await this.userRepository.findByEmail(
            email
        );
        if (isUserAlreadyExists) {
            throw new Error("User already exists");
        }

        const hashedPassword = await this.encrypter.encrypt(password);
        const user = new User({ name, email, password: hashedPassword });
        await this.userRepository.create(user);
    }
}
