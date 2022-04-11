
let transactionLog = new Map(); // declaring variable for map object
let transactionIDs = [];        // storing all the unique transaction IDs for simplicity

// recordTransaction takes the name of the group member, the transaction amount, and
// the date, and also possibly an image or description. It creates a new transaction in the 
// transactionLog map with a unique 5 digit ID as the key and the transaction object as a value.
function recordTransaction(name, total, date, img = null, desc = null) {
    transactionLog.set(makeid(5), new Transaction(name, total, date, img, desc));
}

// printTransactions logs the transaction log to the console
function printTransactions() {
    transactionLog.forEach(function (value, key) {
        console.log(key + ' = ' + value.getName() + " - $" + value.getTotal() + " on: " + value.getDate())
    })
}


// The Transaction class creates objects which represent a single transaction. The transactions 
// are stored in a Map using a unique 5 digit ID as the key, and the transaction object
// as the value. Transaction objects contain 5 fields: name, total, date, image, description
class Transaction {
    constructor(name, total, date, img = null, desc = null) {
        this.name = name
        this.total = total;
        this.date = date;
        this.img = img;
        this.desc = desc;
    }

    // basic setters and getters 

    getName() {
        return this.name;
    }
    setName(n) {
        this.name = n;
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
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    if (!(transactionLog.has(result))) {
        transactionIDs.push(result);
        return result;
    }
    else {
        makeid(length);
        console.log("got here") // error when it generates the same ID 
    }
}
