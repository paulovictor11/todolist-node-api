import { Task } from "../../../domain/task";

export interface ITaskRepository {
    completeTask(id: number): Promise<void>;
    findByTitle(title: string): Promise<Task | null>;
    findById(id: number): Promise<Task | null>;
    listAll(): Promise<Task[]>;
    create(task: Task): Promise<void>;
    update(task: Task, id: number): Promise<void>;
    delete(id: number): Promise<void>;
}
