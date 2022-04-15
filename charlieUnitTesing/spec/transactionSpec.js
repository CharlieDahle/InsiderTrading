describe("recordTransaction", () => {

    it("records the correct fields for name, item, total, and date in K,V pair", () => {

        recordTransaction("Charlie", "breakfast", 25, "4/14/2022");


        for (let [key, value] of transactionLog) {
            expect(value.name).toBe("Charlie");
            expect(value.item).toBe("breakfast");
            expect(value.total).toBe(25);
            expect(value.date).toBe("4/14/2022");

        }
    });
});

describe("makeid", () => {

    it("generates a random string that is the length of the parameter it recieves", () => {
        let id1 = makeid(5);
        let id2 = makeid(5);
        let id3 = makeid(5);

        expect(id1.length).toBe(5);
        expect(id1 != id2);
        expect(id1 != id3);
        expect(id2 != id3);

    })

});