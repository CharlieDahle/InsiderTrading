// START OF CHARLIE'S TRANSACTION LOGGING CODE

let transactionLog = new Map(); // a log of all transactions. K is 5 digit random string, V is transaction object
let transactionIDs = []; // storing all the unique transaction IDs for simplicity
let usersInGroup = [];  // keeps track of all users in the group 

// recordTransaction takes the name of the group member, the item, the transaction amount, and
// the date. It creates a new transaction in the transactionLog map with a unique 5 digit ID as 
// the key and the transaction object as a value. It returns the 5 digit ID key.
function recordTransaction(name, item, total, date) {
    if (!(name in usersInGroup)) {
        usersInGroup.push(name);
    }
    let id = makeid(5);

    transactionLog.set(id, new Transaction(name, item, total, date));

    return id;
}

// The Transaction class creates objects which represent a single transaction. The transactions
// are stored in a dMap using a unique 5 digit ID as the key, and the transaction object
// as the value. Transaction objects contain 5 fields: name, total, date, image, description
class Transaction {

    constructor(name, item, total, date) {
        this.name = name;
        this.item = item;
        this.total = total;
        this.date = date;
    }

    // basic setters and getters

    getName() {
        return this.name;
    }
    setName(n) {
        this.name = n;
    }
    getItem() {
        return this.item;
    }
    setItem(i) {
        this.item = i;
    }
    getTotal() {
        return this.total;
    }
    setTotal(newTotal) {
        this.total = newTotal;
    }

    getDate() {
        return this.date;
    }
    setDate(newDate) {
        this.date = newDate;
    }
}

// Parameters: length of requested id
// Return: unique and random id
// makeid generates a random string that is the length of the parameter it recieves

function makeid(length) {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (!transactionLog.has(result)) {
        transactionIDs.push(result);
        return result;
    } else {
        makeid(length);
    }
}

// END OF CHARLIE'S CODE