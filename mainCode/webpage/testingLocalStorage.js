//This pages testes making a new account so you have to clear the key and passwords in localStorage 
//or change the "verify new user accepts new account" in order for the tests to run correctly

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
});

describe("verify new user", () => {
    it("rejects existing account", () => {
        localStorage.setItem("thnguyen@pugetsound.edu", "46WaterBottles")
        expect(verifyNewUser("thnguyen@pugetsound.edu", "Anything1")).toMatch("This email is already associated with an account. Try again.");
    });
    it("accepts new account", () => {
        expect(verifyNewUser("johndoe12@gmail.com", "FakeAccount4")).toMatch("New user created.");
    });
    it("rejects bad password", () => {
        expect(verifyNewUser("janedoe92@gmail.com", "password")).toMatch("Password must have at least 8 characters, not contain the word password and have an uppercase letter");
    });
    it("rejects bad email", () => {
        expect(verifyNewUser("janedoe", "What4ever")).toMatch("Incorrect email format.");
    });

});


