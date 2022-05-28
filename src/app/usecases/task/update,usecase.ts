import { Task } from "../../../domain/task";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { ITaskRepository } from "../../repositories/domain/task-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

interface IUpdateTaskUsecaseRequest {
    title: string;
    projectId: number;
    assignedTo: number;
}

export class UpdateTaskUsecase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(
        { title, projectId, assignedTo }: IUpdateTaskUsecaseRequest,
        id: number
    ): Promise<void> {
        if (!id) {
            throw new MissingParamError("task id");
        }

        const doesTaskExists = await this.taskRepository.findById(id);
        if (!doesTaskExists) {
            throw new NotFoundError("task");
        }

        const task = new Task({ id, title, projectId, assignedTo });
        await this.taskRepository.update(task, id);
    }
}
