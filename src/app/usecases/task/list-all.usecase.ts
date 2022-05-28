import { Task } from "../../../domain/task";
import { ITaskRepository } from "../../repositories/domain/task-repository";

export class ListAllTasksUsecase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(): Promise<Task[]> {
        return await this.taskRepository.listAll();
    }
}
