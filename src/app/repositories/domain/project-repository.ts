import { Project } from "../../../domain/project";

export interface IProjectRepository {
    findByTitle(title: string): Promise<Project | null>;
    findById(id: number): Promise<Project | null>;
    listAll(): Promise<Project[]>;
    create(project: Project): Promise<void>;
    update(project: Project, id: number): Promise<void>;
    delete(id: number): Promise<void>;
}
