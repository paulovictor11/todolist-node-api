import { ITaskRepository } from "../../../../app/repositories/domain/task-repository";
import { Task } from "../../../../domain/task";
import { prisma } from "../prisma";

export class PrismaTaskRepository implements ITaskRepository {
    async completeTask(id: number): Promise<void> {
        await prisma.task.update({
            where: { id },
            data: {
                completed: true,
            },
        });
    }

    async findByTitle(title: string): Promise<Task | null> {
        const task = await prisma.task.findFirst({
            where: { title },
        });

        if (!task) {
            return null;
        }

        return new Task({
            id: task.id,
            title: task.title,
            projectId: task.projectId,
            assignedTo: task.assignedTo,
            completed: task.completed,
        });
    }

    async findById(id: number): Promise<Task | null> {
        const task = await prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            return null;
        }

        return new Task({
            id: task.id,
            title: task.title,
            projectId: task.projectId,
            assignedTo: task.assignedTo,
            completed: task.completed,
        });
    }

    async listAll(): Promise<Task[]> {
        const tasks = await prisma.task.findMany({
            orderBy: {
                createAt: "asc",
            },
        });
        return tasks.map(
            (task) =>
                new Task({
                    id: task.id,
                    title: task.title,
                    projectId: task.projectId,
                    assignedTo: task.assignedTo,
                    completed: task.completed,
                })
        );
    }

    async create(task: Task): Promise<void> {
        await prisma.task.create({
            data: {
                title: task.title,
                projectId: task.projectId,
                assignedTo: task.assignedTo,
                completed: task.completed,
            },
        });
    }

    async update(task: Task, id: number): Promise<void> {
        await prisma.task.update({
            where: { id },
            data: {
                title: task.title,
                projectId: task.projectId,
                assignedTo: task.assignedTo,
                completed: task.completed,
            },
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.task.delete({
            where: { id },
        });
    }
}
