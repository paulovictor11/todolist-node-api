import { UpdateUserPasswordUsecase } from "../../../app/usecases/auth/update-password.usecase";
import { Encrypter } from "../../../app/utils/helpers/encrypter";
import { InMemoryUserRepository } from "../../repositories/inMemoryUserRepository";
import { faker } from "@faker-js/faker";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { User } from "../../../domain/user";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const sut = new UpdateUserPasswordUsecase(repository, encrypter);

    return {
        repository,
        encrypter,
        sut,
    };
};

const userSpy = {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

describe("Update user password usecase", () => {
    it("should throw an error when no user id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("123456", Number(""));

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should throw an error when no password is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("", 1);

        expect(promise).rejects.toThrow(new MissingParamError("password"));
    });

    it("should throw an error when no user is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("123456", 1);

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should be able to update a user password", async () => {
        const { sut, repository, encrypter } = makeSut();
        const hashedPassword = await encrypter.encrypt(userSpy.password);

        await repository.create(
            new User({ ...userSpy, password: hashedPassword })
        );

        const promise = sut.execute(userSpy.password, userSpy.id);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeUndefined();
    });
});
