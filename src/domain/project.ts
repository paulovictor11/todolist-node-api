import { Task } from "./task";

interface IProjectProps {
    title: string;
    description: string | null;
    userId: number;
    tasks?: Task[];
}

export class Project {
    private props: IProjectProps;
    private _id: number;

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this.props.title;
    }

    get description(): string {
        return this.props.description ?? "";
    }

    get userId(): number {
        return this.props.userId;
    }

    get tasks(): Task[] {
        return this.props.tasks ?? [];
    }

    constructor(props: IProjectProps, id: number) {
        this.props = props;
        this._id = id;
    }
}
