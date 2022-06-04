import { faker } from "@faker-js/faker";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { FindUserByIdUsecase } from "../../../app/usecases/user/find-by-id.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { User } from "../../../domain/user";
import { InMemoryUserRepository } from "../../repositories/inMemoryUserRepository";

const makeSut = () => {
    const repository = new InMemoryUserRepository();
    const sut = new FindUserByIdUsecase(repository);

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

describe("Find user by id usecase", () => {
    it("should throw an error when no id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(Number(""));

        expect(promise).rejects.toThrow(new MissingParamError("user id"));
    });

    it("should throw an error when no user is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(userSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("user"));
    });

    it("should be able to found and return an user", async () => {
        const { sut, repository } = makeSut();
        const user = new User(userSpy);
        await repository.create(user);

        const promise = sut.execute(userSpy.id);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toStrictEqual(user.toJson());
        expect((await promise).id).toBeTruthy();
    });
});
