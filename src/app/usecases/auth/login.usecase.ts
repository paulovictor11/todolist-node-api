import { User } from "../../../domain/user";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { Unathorized } from "../../presentation/errors/unathorized";
import { IUserRepository } from "../../repositories/domain/user-repository";
import { IEncrypterRepository } from "../../repositories/helper/encrypter-repository";
import { ITokenGenerator } from "../../repositories/helper/token-generator-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

interface IAuthRequest {
    email: string;
    password: string;
}

interface IAuthData {
    user: User;
    token: string;
}

export class LoginUsecase {
    constructor(
        private userRepository: IUserRepository,
        private encrypter: IEncrypterRepository,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute({ email, password }: IAuthRequest): Promise<IAuthData> {
        if (!email) {
            throw new MissingParamError("email");
        }

        if (!password) {
            throw new MissingParamError("password");
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError("user");
        }

        if (!(await this.encrypter.compare(password, user.password))) {
            throw new Unathorized();
        }

        const token = await this.tokenGenerator.generate(user.id!);
        return {
            user,
            token,
        };
    }
}
