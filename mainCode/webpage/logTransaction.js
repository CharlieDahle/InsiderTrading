// START OF CHARLIE'S TRANSACTION LOGGING CODE


let transactionLog = new Map(); // declaring variable for map object
let transactionIDs = [];        // storing all the unique transaction IDs for simplicity
let usersInGroup = [];

// recordTransaction takes the name of the group member, the subject, the transaction amount, and
// the date, and also possibly an image or description. It creates a new transaction in the 
// transactionLog map with a unique 5 digit ID as the key and the transaction object as a value.
function recordTransaction(name, item, total, date) {
    if (!(name in usersInGroup)) {
        usersInGroup.push(name);
    }
    transactionLog.set(makeid(5), new Transaction(name, item, total, date));
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
    constructor(name, item, total, date) {
        this.name = name
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

transactionLog.set(makeid(5), new Transaction("Charlie", "breakfast", 25, "10/12/2022"));
transactionLog.set(makeid(5), new Transaction("Charlie", "lunch", 20, "12/14/2022"));
transactionLog.set(makeid(5), new Transaction("Charlie", "dinner", 14, "12/14/2022"));
transactionLog.set(makeid(5), new Transaction("Charlie", "something", 29, "12/14/2022"));

transactionLog.set(makeid(5), new Transaction("Tina", "cookies", 11, "04/23/2022"));
transactionLog.set(makeid(5), new Transaction("Tina", "detergent", 18, "04/23/2022"));
transactionLog.set(makeid(5), new Transaction("Tina", "weed", 420, "04/23/2022"));
transactionLog.set(makeid(5), new Transaction("Tina", "concert tickets", 28, "04/23/2022"));


usersInGroup.push("Charlie");
usersInGroup.push("Tina");
usersInGroup.push("Trevor");

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


// END OF CHARLIE'S CODE



/**
 * 
 * toggles the dropdown for the menu item with given id
 */

function toggleDropdown(id) {
    var dropdownElement = document.getElementById(id);


    /**
     * toggle dropdown
     */
    dropdownElement.classList.toggle("hiddenDropdown");
}

/**
 * 
 * this function creates the main content of each tab. If you select the "My Group/Home" tab 
 * on the sidebar, then a table will be shown for each group you select. 
 * TODO: make it so that you can change between the groups in this tab
 */



function changeMainTab(tabName) {


    var tabContent = document.getElementById("tabcontent");
    tabContent.innerHTML = "";
    if (tabName == "home") {
        // let table = document.createElement("table");
        // table.id = "transaction_table";
        // table.setAttribute("border", 3);
        // table.className = "table-content";

        // let nameTh = document.createElement("th");
        // //nameTh.setAttribute("colspan", 2);
        // let addButton = document.createElement("th")
        // nameTh.innerHTML = "transactions";
        // addButton.innerHTML = "<input type=\"submit\" value=\"Add Transaction\" id=\"addButton\">";

        // table.appendChild(nameTh);
        // table.appendChild(addButton);

        // addButton.addEventListener("click", addTransaction());;




        // tabContent.appendChild(table);
    }
    else if (tabName == "settings") {

    }

}

/**
 * this function should go through the map of transactions. For every transaction it 
 * should check to see if the name is already being displayed. If it is, then the
 * transaction item (need to add still), date, and total should be added to that users list. 
 * If the name is not already being displayed, then it should create a 
 * new cell with a list containing the item, date, and total. 
 */

// this function assumes access to a list containing the names of all users in the group

function createTable() {

    let table = document.getElementById("transaction_table");

    for (let x = 0; x < usersInGroup.length; x++) {

        let tr = document.createElement("tr");
        let nameTd = document.createElement("td");
        nameTd.innerHTML = (usersInGroup[x]);
        let td = document.createElement("td");
        tr.appendChild(nameTd);
        tr.appendChild(td);

        let oldText = "<ul>";
        let newText = "";

        for (let [key, value] of transactionLog) {
            if (value.name == usersInGroup[x]) {

                newText = "<li> <b>" + value.item + " on " + value.date + " for $" + value.total + "</b> </li>";

                oldText = oldText + newText;

                td.innerHTML = oldText;
            }
        }
        td.innerHTML = oldText + "</ul>";
        table.appendChild(tr);
    }
}

/**
 * is called when a button "add transaction" is clicked
 */
function addTransaction() {
    console.log("detected button action");
    //let sign = prompt("Hello! Log your transaction in the following format: \n\"name, item, date, cost\"");
}



