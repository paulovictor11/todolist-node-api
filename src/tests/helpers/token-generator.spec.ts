import { faker } from "@faker-js/faker";
import { MissingParamError } from "../../app/utils/errors/missing-param-error";
import { TokenGenerator } from "../../app/utils/helpers/token-generator";

const makeSut = () => {
    const sut = new TokenGenerator();

    return {
        sut,
    };
};

describe("Token Generator", () => {
    describe("Generate", () => {
        it("should throw an error when no user id is provided", async () => {
            const { sut } = makeSut();
            const promise = sut.generate(Number(""));

            expect(promise).rejects.toThrow(new MissingParamError("id"));
        });

        it("should be able to generate a token when a valid user id is provided", async () => {
            const { sut } = makeSut();
            const promise = sut.generate(faker.datatype.number());

            expect(promise).resolves.not.toThrow();
            expect(await promise).not.toBeUndefined();
        });
    });

    describe("Validate", () => {
        it("should throw an error when no token is provided", async () => {
            const { sut } = makeSut();
            const promise = sut.validate("");

            expect(promise).rejects.toThrow(new MissingParamError("token"));
        });

        it("should be able to validate a token", async () => {
            const { sut } = makeSut();
            const token = await sut.generate(1);
            const promise = sut.validate(token);

            expect(promise).resolves.not.toThrow();
        });
    });
});
