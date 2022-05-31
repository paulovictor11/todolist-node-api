import { LoginUsecase } from "../../../app/usecases/auth/login.usecase";
import { Encrypter } from "../../../app/utils/helpers/encrypter";
import { TokenGenerator } from "../../../app/utils/helpers/token-generator";
import { InMemoryUserRepository } from "../../repositories/inMemoryUserRepository";
import { faker } from "@faker-js/faker";
import { User } from "../../../domain/user";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { Unathorized } from "../../../app/presentation/errors/unathorized";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const tokenGenerator = new TokenGenerator();
    const sut = new LoginUsecase(repository, encrypter, tokenGenerator);

    return {
        repository,
        encrypter,
        tokenGenerator,
        sut,
    };
};

const userSpy = {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

describe("Login usecase", () => {
    it("should throw an error when no email is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ email: "", password: userSpy.password });

        expect(promise).rejects.toThrow(new MissingParamError("email"));
    });

    it("should throw an error when no password is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ email: userSpy.email, password: "" });

        expect(promise).rejects.toThrow(new MissingParamError("password"));
    });

    it("should throw an error when no user is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({
            email: userSpy.email,
            password: userSpy.password,
        });

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should throw an error when an invalid password provided", async () => {
        const { sut, repository, encrypter } = makeSut();
        const hashedPassword = await encrypter.encrypt(userSpy.password);

        await repository.create(
            new User({ ...userSpy, password: hashedPassword })
        );

        const promise = sut.execute({
            email: userSpy.email,
            password: "invalid_password",
        });

        expect(promise).rejects.toThrow(new Unathorized("Invalid password"));
    });

    it("should be able to authenticate a user", async () => {
        const { sut, repository, encrypter } = makeSut();
        const hashedPassword = await encrypter.encrypt(userSpy.password);

        await repository.create(
            new User({ ...userSpy, password: hashedPassword })
        );

        const result = await sut.execute({
            email: userSpy.email,
            password: userSpy.password,
        });

        expect(result.user).toBeTruthy();
        expect(result.token).toBeTruthy();
    });
});
