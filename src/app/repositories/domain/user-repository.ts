import { User } from "../../../domain/user";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    listAll(): Promise<User[]>;
    create(user: User): Promise<void>;
    update(user: User, id: number): Promise<void>;
    delete(id: number): Promise<void>;
}
