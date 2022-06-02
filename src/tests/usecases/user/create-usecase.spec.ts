import { faker } from "@faker-js/faker";
import { CreateUserUsecase } from "../../../app/usecases/user/create.usecase";
import { InvalidParamError } from "../../../app/utils/errors/invalid-param-error";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { EmailValidator } from "../../../app/utils/helpers/email-validator";
import { Encrypter } from "../../../app/utils/helpers/encrypter";
import { User } from "../../../domain/user";
import { InMemoryUserRepository } from "../../repositories/inMemoryUserRepository";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const emailValidator = new EmailValidator();
    const encrypter = new Encrypter();
    const sut = new CreateUserUsecase(repository, emailValidator, encrypter);

    return {
        repository,
        emailValidator,
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

describe("Create user usecase", () => {
    it("should throw an error when no name is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...userSpy, name: "" });

        expect(promise).rejects.toThrow(new MissingParamError("name"));
    });

    it("should throw an error when no email is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...userSpy, email: "" });

        expect(promise).rejects.toThrow(new MissingParamError("email"));
    });

    it("should throw an error when an invalid email is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...userSpy, email: "invalid_email" });

        expect(promise).rejects.toThrow(new InvalidParamError("email"));
    });

    it("should throw an error when no password is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...userSpy, password: "" });

        expect(promise).rejects.toThrow(new MissingParamError("password"));
    });

    it("should throw an error when an already created user is provided", async () => {
        const { sut, repository, encrypter } = makeSut();
        const hashedPassword = await encrypter.encrypt(userSpy.password);

        await repository.create(
            new User({ ...userSpy, password: hashedPassword })
        );

        const promise = sut.execute({ ...userSpy, password: hashedPassword });

        expect(promise).rejects.toThrow("User already exists");
    });

    it("should be able to create an user", async () => {
        const { sut, encrypter } = makeSut();
        const hashedPassword = await encrypter.encrypt(userSpy.password);
        const promise = sut.execute({ ...userSpy, password: hashedPassword });

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeUndefined();
    });
});
