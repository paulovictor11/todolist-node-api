import { User } from "../../../domain/user";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { IUserRepository } from "../../repositories/domain/user-repository";
import { IEncrypterRepository } from "../../repositories/helper/encrypter-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

export class UpdateUserPasswordUsecase {
    constructor(
        private userRepository: IUserRepository,
        private encrypter: IEncrypterRepository
    ) {}

    async execute(password: string, id: number): Promise<void> {
        if (!id) {
            throw new MissingParamError("user id");
        }

        if (!password) {
            throw new MissingParamError("password");
        }

        const doesUserExists = await this.userRepository.findById(id);
        if (!doesUserExists) {
            throw new NotFoundError("user");
        }

        const hashedPassword = await this.encrypter.encrypt(password);
        const user = new User({
            id: id,
            name: doesUserExists.name,
            email: doesUserExists.email,
            password: hashedPassword,
        });
        await this.userRepository.update(user, id);
    }
}
