import { faker } from "@faker-js/faker";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { CompleteTaskUsecase } from "../../../app/usecases/task/complete.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { Task } from "../../../domain/task";
import { InMemoryTaskRepository } from "../../repositories/inMemoryTaskRepository";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new CompleteTaskUsecase(repository);

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

describe("Complete task usecase", () => {
    it("should throw an error when no task id is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(Number(""));

        expect(promise).rejects.toThrow(new MissingParamError("task id"));
    });

    it("should throw an error when no task is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(taskSpy.id);

        expect(promise).rejects.toThrow(new NotFoundError("task"));
    });

    it("should be able to complete a task", async () => {
        const { sut, repository } = makeSut();
        const task = new Task({ ...taskSpy, completed: false });
        await repository.create(task);

        const promise = sut.execute(taskSpy.id);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeUndefined();
    });
});
