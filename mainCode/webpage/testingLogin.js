describe("getLogin", () => {
    it("allows access with correct credentials", () => {
        localStorage.setItem("fakeUser146@gmail.com", "LetMeIn46")
        expect(getLogin("fakeUser146@gmail.com", "LetMeIn46")).toMatch("Login succesful.");
    });
    it("rejects wrong password", () => {
        expect(getLogin("fakeUser146@gmail.com", "YouAreWrong")).toMatch("Wrong password. Please try again.");
    });
    it("no user", () => {
        expect(getLogin("notExist24@gmail.com", "Anything23")).toMatch("No username found.");
    });
});


describe("reset Password", () => {
    it("does not accept nonexisting account", () => {
        expect(resetPassword("notAKey865@gmail.com", "Cups1235", "mousePad63", "Keys981", "Camera09")).toMatch("This email does not exist.");
    });
    it("rejects wrong existing Password", () => {
        localStorage.setItem("AnotherFakeUser146@gmail.com", "LetMeIn46");
        expect(resetPassword("AnotherFakeUser146@gmail.com", "Cups1235", "mousePad63", "Keys981",
            "Camera09")).toMatch("Incorrect old password.");

    });
    it("cannot confirm password", () => {
        expect(resetPassword("AnotherFakeUser146@gmail.com", "LetMeIn46", "LetMeIn46", "Keys981",
            "Camera09")).toMatch("Passwords do not match.");

    });
    it("successful reset", () => {
        localStorage.setItem("PaperClipLover12@gmail.com", "LetMeIn88");
        expect(resetPassword("PaperClipLover12@gmail.com", "LetMeIn88", "Keys981", "Keys981")).toMatch("Password reset succesful.");

    });
});
