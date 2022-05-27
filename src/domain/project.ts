import { Task } from "./task";

interface IProjectProps {
    title: string;
    description?: string;
    userId: number;
    tasks?: Task[];
}

export class Project {
    private props: IProjectProps;
    private _id?: number;

    get id(): number | null {
        return this._id ?? null;
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

    constructor(props: IProjectProps, id?: number) {
        this.props = props;
        this._id = id;
    }
}
