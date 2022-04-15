describe("strong Password", () => {
    it("has correct length", () => {
        expect(isStrongPassword("Abcde12345")).toBe(true);
    });
    it("cannot have password in it", () => {
        expect(isStrongPassword("Mypassword3")).toBe(false);
    });
    it("has upper case letter", () => {
        expect(isStrongPassword("Icecream46")).toBe(true);
    });
});

describe("correct username format", () => {
    it("needs the @", () => {
        expect(correctEmail("thnguyen@pugetsound.edu")).toBe(true);
    });
    it("must have a .", () => {
        expect(correctEmail("thnguyen")).toBe(false);
    });
    it("is not correct", () => {

        expect(correctEmail(12345)).toBe(false);
    });
}); s


