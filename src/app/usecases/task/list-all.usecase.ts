import { ITask } from "../../../domain/task";
import { ITaskRepository } from "../../repositories/domain/task-repository";

export class ListAllTasksUsecase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(): Promise<ITask[]> {
        const tasks = await this.taskRepository.listAll();
        return tasks.map((task) => task.toJson());
    }
}
