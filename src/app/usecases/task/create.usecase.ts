import { Task } from "../../../domain/task";
import { ITaskRepository } from "../../repositories/domain/task-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

interface ICreateTaskUsecaseRequest {
    title: string;
    projectId: number;
    assignedTo: number;
}

export class CreateTaskUsecase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute({
        title,
        projectId,
        assignedTo,
    }: ICreateTaskUsecaseRequest): Promise<void> {
        if (!title) {
            throw new MissingParamError("title");
        }

        if (!projectId) {
            throw new MissingParamError("project id");
        }

        if (!assignedTo) {
            throw new MissingParamError("assigned to");
        }

        const task = new Task({ title, projectId, assignedTo });
        await this.taskRepository.create(task);
    }
}
