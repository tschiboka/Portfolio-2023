import { isArticle } from "../components/sharedComponents/Nav/Nav";

describe("Is Article", () => {
    it("Should Return False for Undefined Input", () => {
        const result = isArticle(undefined);
        expect(result).toBe(false);
    });
    it("Should Return False for Paths with NOT Starting with /blog/", () => {
        const result = isArticle("/home");
        expect(result).toBe(false);
    });
    it("Should Return True for Article Paths", () => {
        const result = isArticle("/blog/example-path");
        expect(result).toBe(true);
    });
});
