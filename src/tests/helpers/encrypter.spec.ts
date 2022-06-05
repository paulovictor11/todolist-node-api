import bcrypt from "bcryptjs";
import { MissingParamError } from "../../app/utils/errors/missing-param-error";
import { Encrypter } from "../../app/utils/helpers/encrypter";

const makeSut = () => {
    const sut = new Encrypter();

    return {
        sut,
    };
};

const encrypterSpy = async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("12345", salt);

    return {
        value: "12345",
        hash,
    };
};

describe("Encrypter", () => {
    describe("Compare", () => {
        it("should throw an error when no value is provided", async () => {
            const { sut } = makeSut();
            const { hash } = await encrypterSpy();
            const promise = sut.compare("", hash);

            expect(promise).rejects.toThrow(new MissingParamError("value"));
        });

        it("should throw an error when no hash is provided", async () => {
            const { sut } = makeSut();
            const { value } = await encrypterSpy();
            const promise = sut.compare(value, "");

            expect(promise).rejects.toThrow(new MissingParamError("hash"));
        });

        it("should return true when compare returns true", async () => {
            const { sut } = makeSut();
            const { value, hash } = await encrypterSpy();
            const promise = sut.compare(value, hash);

            expect(promise).resolves.not.toThrow();
            expect(await promise).toBeTruthy();
        });

        it("should return false when compare returns false", async () => {
            const { sut } = makeSut();
            const { hash } = await encrypterSpy();
            const promise = sut.compare("132456", hash);

            expect(promise).resolves.not.toThrow();
            expect(await promise).toBeFalsy();
        });
    });

    describe("Encrypt", () => {
        it("should throw an error when no value is provided", async () => {
            const { sut } = makeSut();
            const promise = sut.encrypt("");

            expect(promise).rejects.toThrow(new MissingParamError("value"));
        });

        it("should be able to encrypt a value", async () => {
            const { sut } = makeSut();
            const { value } = await encrypterSpy();
            const promise = sut.encrypt(value);

            expect(promise).resolves.not.toThrow();
            expect(await promise).not.toBeUndefined();
        });
    });
});
