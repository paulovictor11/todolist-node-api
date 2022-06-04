import { faker } from "@faker-js/faker";
import { NotFoundError } from "../../../app/presentation/errors/not-found-error";
import { FindTaskByTitleUsecase } from "../../../app/usecases/task/find-by-title.usecase";
import { MissingParamError } from "../../../app/utils/errors/missing-param-error";
import { Task } from "../../../domain/task";
import { InMemoryTaskRepository } from "../../repositories/inMemoryTaskRepository";

const makeSut = () => {
    const repository = new InMemoryTaskRepository();
    const sut = new FindTaskByTitleUsecase(repository);

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

describe("Find task by title usecase", () => {
    it("should throw an error when no title is provided", async () => {
        const { sut } = makeSut();
        const promise = sut.execute("");

        expect(promise).rejects.toThrow(new MissingParamError("title"));
    });

    it("should throw an error when no task is founded", async () => {
        const { sut } = makeSut();
        const promise = sut.execute(taskSpy.title);

        expect(promise).rejects.toThrow(new NotFoundError("task"));
    });

    it("should be able to find a task", async () => {
        const { sut, repository } = makeSut();
        const task = new Task(taskSpy);
        await repository.create(task);

        const promise = sut.execute(taskSpy.title);

        expect(promise).resolves.not.toThrow();
        expect(await promise).toStrictEqual(task.toJson());
    });
});
