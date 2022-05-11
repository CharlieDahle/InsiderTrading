describe("strong Password", () => {
    it("has correct length", () => {
        expect(isStrongPassword("aSuperLongGood123")).toBe(true);
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
    it("accepts new account", () => {
        expect(verifyNewUser("verynewperson@gmail.com", "FakeAccount4")).toMatch("New user created.");
    });
    it("rejects existing account", () => {
        localStorage.setItem("meganmorgan@pugetsound.edu", "93MilkJugs");
        expect(verifyNewUser("meganmorgan@pugetsound.edu", "Anything1")).toMatch("This email is already associated with an account. Try again.");
    });
    it("rejects bad password", () => {
        expect(verifyNewUser("janedoe92@gmail.com", "password")).toMatch("Password must have at least 8 characters, not contain the word password and have an uppercase letter");
    });
    it("rejects bad email", () => {
        expect(verifyNewUser("janedoe", "What4ever")).toMatch("Incorrect email format.");
    });



});


