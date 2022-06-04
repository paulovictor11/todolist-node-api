import { faker } from "@faker-js/faker";
import { CreateTaskUsecase } from "../../../app/usecases/task/create.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { InMemoryTaskRepository } from "../../repositories/inMemoryTaskRepository";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new CreateTaskUsecase(repository);

    return {
        repository,
        sut,
    };
};

const taskSpy = {
    id: faker.datatype.number(),
    title: faker.lorem.sentence(),
    projectId: faker.datatype.number(),
    assignedTo: faker.datatype.number(),
    completed: faker.datatype.boolean(),
};

describe("Create task usecase", () => {
    it("should throw an error when no title is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...taskSpy, title: "" });

        expect(promise).rejects.toThrow(new MissingParamError("title"));
    });

    it("should throw an error when no project id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...taskSpy, projectId: Number("") });

        expect(promise).rejects.toThrow(new MissingParamError("project id"));
    });

    it("should throw an error when no assigned to is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute({ ...taskSpy, assignedTo: Number("") });

        expect(promise).rejects.toThrow(new MissingParamError("assigned to"));
    });

    it("should be able to create a task", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(taskSpy);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeUndefined();
    });
});
