import { faker } from "@faker-js/faker";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { UpdateUserUsecase } from "../../../app/usecases/user/update.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { User } from "../../../domain/user";
import { InMemoryUserRepository } from "../../repositories/inMemoryUserRepository";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const sut = new UpdateUserUsecase(repository);

    return {
        repository,
        sut,
    };
};

const userSpy = {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

describe("Update user usecase", () => {
    it("should throw an error when no user id is provided", () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy, Number(""));

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should throw an error when no user is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy, userSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should be able to update an user", async () => {
        const { sut, repository } = makeSut();
        const user = new User(userSpy);
        await repository.create(user);

        const promise = sut.execute(
            { name: userSpy.name, email: "updated_email@email.com" },
            userSpy.id
        );

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeUndefined();
    });
});
