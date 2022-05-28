export interface ITokenGenerator {
    generate(id: number): Promise<string>;
    validate(token: string): Promise<void>;
}
