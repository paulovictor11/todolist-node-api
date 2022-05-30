import { IProjectRepository } from "../../../../app/repositories/domain/project-repository";
import { Project } from "../../../../domain/project";
import { Task } from "../../../../domain/task";
import { prisma } from "../prisma";

export class PrismaProjectRepository implements IProjectRepository {
    async findByTitle(title: string): Promise<Project | null> {
        const project = await prisma.project.findFirst({
            where: { title },
            include: {
                Task: true,
            },
        });

        if (!project) {
            return null;
        }

        const tasks = project.Task.map(
            (task) =>
                new Task({
                    id: task.id,
                    title: task.title,
                    projectId: task.projectId,
                    assignedTo: task.assignedTo,
                    completed: task.completed,
                })
        );

        return new Project({
            id: project.id,
            title: project.title,
            description: project.description ?? undefined,
            userId: project.userId,
            tasks,
        });
    }

    async findById(id: number): Promise<Project | null> {
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                Task: true,
            },
        });

        if (!project) {
            return null;
        }

        const tasks = project.Task.map(
            (task) =>
                new Task({
                    id: task.id,
                    title: task.title,
                    projectId: task.projectId,
                    assignedTo: task.assignedTo,
                    completed: task.completed,
                })
        );

        return new Project({
            id: project.id,
            title: project.title,
            description: project.description ?? undefined,
            userId: project.userId,
            tasks,
        });
    }

    async listAll(): Promise<Project[]> {
        const projects = await prisma.project.findMany({
            orderBy: {
                createAt: "asc",
            },
        });

        return projects.map(
            (project) =>
                new Project({
                    id: project.id,
                    title: project.title,
                    description: project.description ?? undefined,
                    userId: project.userId,
                })
        );
    }

    async create(project: Project): Promise<void> {
        await prisma.project.create({
            data: {
                title: project.title,
                description: project.description,
                userId: project.userId,
            },
        });
    }

    async update(project: Project, id: number): Promise<void> {
        await prisma.project.update({
            where: { id },
            data: {
                title: project.title,
                description: project.description,
                userId: project.userId,
            },
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.project.delete({
            where: { id },
        });
    }
}
