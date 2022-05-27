import { Project } from "../../../domain/project";
import { NotFoundError } from "../../presentation/errors/not-found-error";
import { IProjectRepository } from "../../repositories/domain/project-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";

interface IUpdateProjectUsecaseRequest {
    title: string;
    description?: string;
    userId: number;
}

export class UpdateProjectUsecase {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(
        { title, description, userId }: IUpdateProjectUsecaseRequest,
        id: number
    ): Promise<void> {
        if (!id) {
            throw new MissingParamError("project id");
        }

        const doesProjectExists = await this.projectRepository.findById(id);
        if (!doesProjectExists) {
            throw new NotFoundError("project");
        }

        const project = new Project({ title, description, userId }, id);
        await this.projectRepository.update(project, id);
    }
}
