/**
 *person class
 *takes a name
 */
class person {
  constructor(name) {
    if (typeof name === "string" || name instanceof String) {
      this.name = name;
      this.total = 0;
      this.log = [[person, 0]]; // if amount is neg; this is owed by person
      this.logIndex = 0;
    } else {
      throw new Error("string req");
    }
  }
  /**
   * prints all transaction related to this person
   */
  getOwe() {
    if (this.logIndex == 0) {
      console.log("no money owed");
    }
    for (let i = 0; i < this.log.length; i++) {
      if (this.log[i][1] > 0) {
        console.log(
          this.name +
            " owes " +
            this.log[i][0].name +
            " $" +
            this.log[i][1].toFixed(2)
        );
      } else if (this.log[i][1] < 0) {
        console.log(
          this.log[i][0].name +
            " owes " +
            this.name +
            " $" +
            -this.log[i][1].toFixed(2)
        );
      }
    }
  }
}
/**
 *group class
 *take a list of person objects
 */
class group {
  constructor(somePeople) {
    if (Array.isArray(somePeople)) {
      this.groupsize = somePeople.length;
      this.somePeople = somePeople;
      this.transNum = 0;
      this.transaction = [[person, person, 0]];

      this.pos = [];
      this.neg = [];
    } else {
      throw new Error("array req");
    }
  }
  makePayment(person, amt, item, date) {
    //neg amounts mean in debt
    transactionLog.set(
      makeid(5),
      new Transaction(person.name, item, amt, date)
    );
    let owed = amt / this.groupsize;
    for (let i = 0; i < this.groupsize; i++) {
      this.somePeople[i].total -= owed;
    }
    person.total += owed * this.groupsize;
  }
  calculate() {
    var self = this;
    let tempTotal = [];
    for (let j = 0; j < self.groupsize; j++) {
      // save totals
      tempTotal[j] = self.somePeople[j].total;
    }
    self.makeLists(); // creates a a list of those who are owed and a list of those who owe
    if (self.pos.length > 0 && self.neg.length > 0) {
      let iLength = Math.min(self.pos.length, self.neg.length);
      for (let i = 0; i < iLength; i++) {
        let amount = Math.min(self.pos[i].total, Math.abs(self.neg[i].total));
        self.transaction[self.transNum] = [self.neg[i], self.pos[i], amount]; //Keeps track of who pays who what
        self.pos[i].log[self.pos[i].logIndex] = [self.neg[i], -amount]; //Keeps track of who pays who what for the individual
        self.neg[i].log[self.neg[i].logIndex] = [self.pos[i], amount]; //Keeps track of who pays who what for the individual
        self.pos[i].logIndex++; // updates the individuals transaction log index
        self.neg[i].logIndex++;
        if (self.pos[i].total + self.neg[i].total > 0) {
          //compares a positive and negative value
          //pairs people from each list
          self.pos[i].total = self.pos[i].total + self.neg[i].total;
          self.neg[i].total = 0;
        } else if (self.pos[i].total + self.neg[i].total < 0) {
          self.neg[i].total = self.pos[i].total + self.neg[i].total;
          self.pos[i].total = 0;
        } else if (self.pos[i].total + self.neg[i].total == 0) {
          self.pos[i].total = 0;
          self.neg[i].total = 0;
        }
        // console.log (self.neg[i].name + " paid " + self.pos[i].name + " " + amount);
        self.transNum++;
      }
      self.calculate(); //recurse to re-pair people up
    }
    for (let k = 0; k < self.groupsize; k++) {
      self.somePeople[k].total = tempTotal[k];
    } // sets total back to what it was
  }
  /**
   * Makes the list of people in the neg and another for people in the pos
   * leaves out those who are balanced
   */
  makeLists() {
    let forPos = 0;
    let forNeg = 0;
    this.neg = [];
    this.pos = [];
    for (let i = 0; i < this.groupsize; i++) {
      if (
        this.somePeople[i].total > -0.0001 &&
        this.somePeople[i].total < 0.0001
      ) {
        this.somePeople[i].total = 0;
      }
      if (this.somePeople[i].total > 0) {
        this.pos[forPos] = this.somePeople[i];
        forPos++;
      } else if (this.somePeople[i].total < 0) {
        this.neg[forNeg] = this.somePeople[i];
        forNeg++;
      } else if (this.somePeople[i].total == 0) {
        //something or nothing
      }
    }
  }
  getGroupOwe() {
    if (this.transNum > 0) {
      let answerDiv = document.getElementById("calculated_answer");
      for (let i = 0; i < this.transaction.length; i++) {
        let p = document.createElement("p");
        p.innerHTML =
          this.transaction[i][0].name +
          " pays " +
          this.transaction[i][1].name +
          " $" +
          this.transaction[i][2].toFixed(2);
        console.log(p.value);
        if (!(p == null)) {
          answerDiv.appendChild(p);
        }
      }
    }
  }
}

// END OF BEN'S CALCULATE CODE

// START OF CHARLIE'S TRANSACTION LOGGING CODE

let transactionLog = new Map(); // a log of all transactions. K is 5 digit random string, V is transaction object
let transactionIDs = []; // storing all the unique transaction IDs for simplicity
let usersInGroup = []; // keeps track of all users in the group

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
// are stored in a Map using a unique 5 digit ID as the key, and the transaction object
// as the value. Transaction objects contain 3 fields: name, item, total, date
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
/**
 * Hard coding a the model group
 */
let ben = new person("ben");
let tina = new person("tina");
let charlie = new person("charlie");
let trevor = new person("trevor");
let g = new group([ben, tina, charlie, trevor]);
for (let i = 0; i < 4; i++) {
  usersInGroup.push(g.somePeople[i].name);
}
g.makePayment(charlie, 25, "breakfast", "04/14/2022");
g.makePayment(charlie, 14, "lunch", "03/21/2022");
g.makePayment(tina, 11, "cookies", "04/29/2022");
g.makePayment(tina, 29, "dinner", "04/14/2022");
g.makePayment(tina, 28, "concert tickets", "04/11/2022");
g.makePayment(tina, 18, "detergent", "04/23/2022");
g.makePayment(ben, 500, "bees", "04/13/2022");
g.makePayment(trevor, 60, "chocolate milk", "04/14/2022");
g.makePayment(trevor, 20, "video game", "04/02/2022");

g.calculate();
g.getGroupOwe();
createTable();

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
 * changes the main tab to the given group
 */
function changeMainTab(tabId) {
  var contents = document.getElementsByClassName("tabcontentwrapper");
  for (var i = 0; i < contents.length; i++) {
    contents[i].classList.add("hiddenContent");
  }
  document.getElementById(tabId).classList.remove("hiddenContent");
}

/**
 * returns a new circle group with the given text
 */
function createCircleGroup(text) {
  var parentDiv = document.createElement("div");
  parentDiv.classList.add("circleGroup");
  var circleText = document.createElement("h3");
  circleText.innerHTML = text;
  parentDiv.appendChild(circleText);
  return parentDiv;
}

// createTable edits the "transaction_table" div. It creates a cell
// for every individual and then an unordered list in that cell for
// that individual's transactions
function createTable() {
  let table = document.getElementById("transaction_table");
  table.innerHTML = "";
  let th = document.createElement("th");
  th.innerHTML = "Transactions";
  th.setAttribute("colspan", 2);
  table.appendChild(th);

  for (let x = 0; x < usersInGroup.length; x++) {
    let tr = document.createElement("tr");
    let nameTd = document.createElement("td");
    nameTd.innerHTML = usersInGroup[x];
    let td = document.createElement("td");
    tr.appendChild(nameTd);
    tr.appendChild(td);

    let oldText = "<ul>";
    let newText = "";

    for (let [key, value] of transactionLog) {
      if (value.name == usersInGroup[x]) {
        newText =
          "<li> <b>" +
          value.item +
          " on " +
          value.date +
          " for $" +
          value.total +
          "</b> </li>";

        oldText = oldText + newText;

        td.innerHTML = oldText;
      }
    }
    td.innerHTML = oldText + "</ul>";
    table.appendChild(tr);
  }
}
