import { Task } from "./task";

interface IProjectProps {
    id?: number;
    title: string;
    description?: string;
    userId: number;
    tasks?: Task[];
}

export class Project {
    constructor(private props: IProjectProps) {}

    get id(): number | null {
        return this.props.id ?? null;
    }

    get title(): string {
        return this.props.title;
    }

    get description(): string | null {
        return this.props.description ?? null;
    }

    get userId(): number {
        return this.props.userId;
    }

    get tasks(): Task[] {
        return this.props.tasks ?? [];
    }
}
