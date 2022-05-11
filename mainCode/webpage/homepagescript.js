

const people = ["charlie", "trevor", "tina", "ben"];
window.groups = {};

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
      this.transaction = [[]];
      this.transactionLog = {}; // a log of all transactions. K is 5 digit random string, V is transaction object
      this.transactionIDs = []; // storing all the unique transaction IDs for simplicity
      this.pos = [];
      this.neg = [];

      /** 
      let b = document.getElementById("add-button");
      b.addEventListener("click", () => {
        let n = document.getElementById("nInput").value;

        let t = document.getElementById("tInput").value;

        let i = document.getElementById("iInput").value;

        let d = document.getElementById("dInput").value;

        let p;

        for (let x = 0; x < this.groupsize; x++) {
          if (this.somePeople[x].name == n) {
            p = this.somePeople[x];
          }
        }

        this.makePayment(p, t, i, d);
        //this.calculate();
        this.getGroupOwe();
        this.createTable();
        saveCurrentTable(window.currentTableId, this);
        changeMainTab("home_table_" + window.currentTableId);
       
      }
     
      );
        **/
    } else {
      throw new Error("array req");
    }
  }

  updateTable() {
    console.log("getting here");
    let n = document.getElementById("nInput").value;

    let t = document.getElementById("tInput").value;

    let i = document.getElementById("iInput").value;

    let d = document.getElementById("dInput").value;

    let p;

    for (let x = 0; x < this.groupsize; x++) {
      if (this.somePeople[x].name == n) {
        p = this.somePeople[x];
      }
    }

    this.makePayment(p, t, i, d);
    this.createTable();
  }

  makePayment(person, amt, item, date) {
    //neg amounts mean in debt
    this.transactionLog[this.makeid(5)] = new Transaction(person.name, item, amt, date);

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
    this.transaction = [];
    this.transNum = 0;
    this.calculate();
    if (this.transNum > 0) {
      let answerDiv = document.getElementById("calculated_answer");
      answerDiv.innerHTML = "";
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
    else {
      document.getElementById("calculated_answer").innerHTML = "";
    }
  }

  makeid(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (!this.transactionLog.hasOwnProperty(result)) {
      this.transactionIDs.push(result);
      return result;
    } else {
      this.makeid(length);
    }
  }

  // createTable edits the "transaction_table" div. It creates a cell
  // for every individual and then an unordered list in that cell for
  // that individual's transactions
  createTable() {
    // let b = document.getElementById("add-button");
    // b.addEventListener("click", () => {

    //   let n = document.getElementById("nInput").value;

    //   let t = document.getElementById("tInput").value;

    //   let i = document.getElementById("iInput").value;

    //   let d = document.getElementById("dInput").value;

    //   let p;

    //   for (let x = 0; x < this.groupsize; x++) {
    //     if (this.somePeople[x].name == n) {
    //       p = this.somePeople[x];
    //     }
    //   }

    //   this.makePayment(p, t, i, d)
    //   //this.createTable();
    // });

    console.log("creating table");
    let table = document.getElementById("transaction_table");
    table.innerHTML = "";
    let th = document.createElement("th");
    th.innerHTML = "Transactions";
    th.setAttribute("colspan", 2);
    table.appendChild(th);

    for (let x = 0; x < this.groupsize; x++) {
      let tr = document.createElement("tr");
      let nameTd = document.createElement("td");
      nameTd.innerHTML = this.somePeople[x].name;
      let td = document.createElement("td");
      tr.appendChild(nameTd);
      tr.appendChild(td);

      let oldText = "<ul>";
      let newText = "";

      var entries = Object.values(this.transactionLog);
      for (var i = 0; i<entries.length; i++) {
      
        var value = entries[i];
   

        if (value.name == this.somePeople[x].name) {
         
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
      console.log("new value");
      table.appendChild(tr);
    }
  }
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
//let allGroups = new Map();

let ben = new person("ben");
let tina = new person("tina");
let charlie = new person("charlie");
let trevor = new person("trevor");
let suitemates = new group([ben, tina, charlie, trevor]);

//allGroups.set()

suitemates.makePayment(charlie, 25, "breakfast", "04/14/2022");
suitemates.makePayment(charlie, 14, "lunch", "03/21/2022");
suitemates.makePayment(tina, 11, "cookies", "04/29/2022");
suitemates.makePayment(tina, 29, "dinner", "04/14/2022");
suitemates.makePayment(tina, 28, "concert tickets", "04/11/2022");
suitemates.makePayment(tina, 18, "detergent", "04/23/2022");
suitemates.makePayment(ben, 500, "bees", "04/13/2022");
suitemates.makePayment(trevor, 60, "chocolate milk", "04/14/2022");
suitemates.makePayment(trevor, 20, "video game", "04/02/2022");

//suitemates.calculate();
suitemates.getGroupOwe();
suitemates.createTable();

// Parameters: length of requested id
// Return: unique and random id
// makeid generates a random string that is the length of the parameter it recieves

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

const TABLE_KEY = "tables";


function saveCurrentTable(tableId, group) {
  var tableObj = {};
  tableObj.log = {};
  var keys = group.transactionIDs;
  for (var i = 0; i < keys.length; i++) {
    tableObj.log[keys[i]] = group.transactionLog[keys[i]];
  }

  tableObj.ids = group.transactionIDs;
  tableObj.users = group.somePeople;

  window.tableData[tableId] = tableObj;

  localStorage.setItem(TABLE_KEY, JSON.stringify(window.tableData));
}

/**
 * loads the table with the given id to the current table
 */
function loadToTable(tableId) {
  window.tableData = JSON.parse(localStorage.getItem(TABLE_KEY));
  var tableObj = window.tableData[tableId];

  if (tableObj != null) {
    window.usersInGroup = tableObj.users;
    if (tableObj.users == null) {

      window.usersInGroup = [];
    }

    var personLs = [];
    //create new group
    for (var i = 0; i < usersInGroup.length; i++) {
      personLs.push(new person(usersInGroup[i]));
    }
    g = new group(personLs);

    //convert log to map
    transactionLog = {}
    var keys = tableObj.ids;
    for (var i = 0; i < keys.length; i++) {
      var transaction = tableObj.log[keys[i]];
      //get person object
      var correctPerson = null;
      for (var z = 0; z < personLs.length; z++) {
        if (personLs[z].name == transaction.name) {
          correctPerson = personLs[z];
          break;
        }
      }

      g.makePayment(
        correctPerson,
        transaction.total,
        transaction.item,
        transaction.date
      );
    }

    return true;
  } else {
    return false;
  }
}
/**
 * changes the main tab to the given group
 */
function changeMainTab(tabId) {
  var contents = document.getElementsByClassName("tabcontentwrapper");
  for (var i = 0; i < contents.length; i++) {
    contents[i].classList.add("hiddenContent");
  }

  //special home table case
  if (tabId.startsWith("home_table")) {
    //clear inputs
    var inputs = document.getElementsByClassName("transaction_input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    //load table

    document.getElementById("home_table").classList.remove("hiddenContent");
    var tableId = tabId.substring("home_table".length + 1);
    window.currentTableId = tableId;


    document.getElementById("table_title").innerHTML =
      tableId.replace("_", " ") + " group";

    //clear current table
    var table = document.getElementById("transaction_table");
    table.innerHTML = "";



    //var loadResult = loadToTable(tableId);
    g = window.groups[tableId];

    g.calculate();
    g.getGroupOwe();
    g.createTable();

    set_correct_group_members(window.groups[window.currentTableId]);


  } else {
    document.getElementById(tabId).classList.remove("hiddenContent");
  }
}

/**
 * creates a new circle group with a default name and user input
 * once user input is given, the group will be saved
 */
function createCircleGroup() {
  /**
   * open create circle group modal
   */
  var new_circle_modal = document.createElement("div");
  new_circle_modal.id = "new_circle_modal";
  document.getElementById("mainContent").appendChild(new_circle_modal);

  var new_circle_title = document.createElement("h1");
  new_circle_title.innerHTML = "New Group";
  new_circle_modal.appendChild(new_circle_title);

  var circleInput = document.createElement("input");
  circleInput.placeholder = "group name";
  new_circle_modal.appendChild(circleInput);

  //group member selections
  for (var i = 0; i < people.length; i++) {
    //add selectable people
    var selectPerson = document.createElement("h2");
    selectPerson.innerHTML = people[i];
    selectPerson.classList.add("selectPerson");
    selectPerson.onclick = function () {
      this.classList.toggle("selected");
    }
    new_circle_modal.appendChild(selectPerson);
  }

  var finalize_group_button = document.createElement("h2");
  finalize_group_button.innerHTML = "create";
  finalize_group_button.id = "confirm_group_button";
  new_circle_modal.appendChild(finalize_group_button);

  finalize_group_button.onclick = () => {
    if (circleInput.value != "" && !window.groups.hasOwnProperty(circleInput.value.trim())) {
      addCircleWithName(circleInput.value);
      saveBubble(circleInput.value);
      addTabToHomeWithName(circleInput.value);


      //create new group
      var selected_people = [];
      var selected_elems = document.getElementsByClassName("selected");
      for (var i = 0; i < selected_elems.length; i++) {
        selected_people.push(new person(selected_elems[i].innerHTML));
      }
      var new_group = new group(selected_people);
      window.groups[circleInput.value.trim()] = new_group;


      saveGroups();
    }
    new_circle_modal.remove();
  }



}

/**
 * adds a circle group with the given name to the home page
 */
function addCircleWithName(name) {
  var parentDiv = document.createElement("div");
  parentDiv.classList.add("circleGroup");
  var circleText = document.createElement("h3");
  circleText.innerHTML = name;
  parentDiv.appendChild(circleText);
  var homeDiv = document.getElementById("home");
  var addButton = homeDiv.children[homeDiv.children.length - 1];
  addButton.before(parentDiv);
  parentDiv.circle_name = name;
  parentDiv.onclick = function () {
    changeMainTab("home_table_" + this.circle_name);
  };
}

function addTabToHomeWithName(name) {
  var homeDropdown = document.getElementById("homeDropdown");
  var newTabText = document.createElement("h5");
  newTabText.innerHTML = name;
  homeDropdown.appendChild(newTabText);
  newTabText.circle_name = name;
  newTabText.onclick = function () {
    changeMainTab("home_table_" + this.circle_name);
  };
}

// createTable edits the "transaction_table" div. It creates a cell
// for every individual and then an unordered list in that cell for
// that individual's transactions
// function createTable() {
//   let table = document.getElementById("transaction_table");
//   table.innerHTML = "";
//   let th = document.createElement("th");
//   th.innerHTML = "Transactions";
//   th.setAttribute("colspan", 2);
//   table.appendChild(th);

//   for (let x = 0; x < usersInGroup.length; x++) {
//     let tr = document.createElement("tr");
//     let nameTd = document.createElement("td");
//     nameTd.innerHTML = usersInGroup[x];
//     let td = document.createElement("td");
//     tr.appendChild(nameTd);
//     tr.appendChild(td);

//     let oldText = "<ul>";
//     let newText = "";

//     for (let [key, value] of transactionLog) {
//       if (value.name == usersInGroup[x]) {
//         newText =
//           "<li> <b>" +
//           value.item +
//           " on " +
//           value.date +
//           " for $" +
//           value.total +
//           "</b> </li>";

//         oldText = oldText + newText;

//         td.innerHTML = oldText;
//       }
//     }
//     td.innerHTML = oldText + "</ul>";
//     table.appendChild(tr);
//   }
// }

const SAVED_BUBBLE_KEY = "bubbles";


/**
 * saves a circle bubble in the local storage
 */
function saveBubble(bubbleName) {
  bubbleLs = getSavedBubbles();
  if (!bubbleLs.includes(bubbleName)) {
    bubbleLs.push(bubbleName);
  }

  //convert back to json string and save
  bubbleLsRaw = JSON.stringify(bubbleLs);
  localStorage.setItem(SAVED_BUBBLE_KEY, bubbleLsRaw);
}

/**
 * returns all bubble names stored in the local storage
 */
function getSavedBubbles() {
  var bubbleLsRaw = localStorage.getItem(SAVED_BUBBLE_KEY);
  var bubbleLs = [];

  if (bubbleLsRaw != null) {
    bubbleLs = JSON.parse(bubbleLsRaw);
  }

  return bubbleLs;
}

/**
 * loads all saved bubbles and appends them to home body
 */
function loadAndAppendBubbles() {
  var bubbleLs = getSavedBubbles();
  for (i = 0; i < bubbleLs.length; i++) {
    //add circle
    addCircleWithName(bubbleLs[i]);

    addTabToHomeWithName(bubbleLs[i]);
  }
}


const GROUPS_KEY = "groups";

/**
 * saves the current groups to local storage
 */
function saveGroups() {
  

  var clone = Object.assign({}, window.groups);
  var keys = Object.keys(clone);

  //replace all people in people log of groups people with strings to avoid cicular json conversion
  for(var i = 0; i<keys.length; i++){
    var gr = clone[keys[i]];
    for(var z = 0 ; z< gr.somePeople.length; z++){
        var person = gr.somePeople[z];
        var new_log = [];
        for(var j = 0; j < person.log; j++){
          new_log.push([person.log[j][0].name, person.log[j][1]])
        }
        person.log = new_log;
    }
  }

  var saveRaw = JSON.stringify(window.groups);
  localStorage.setItem(GROUPS_KEY, saveRaw);
}

/**
 * loads groups to window data
 */
function loadGroups() {
  var rawData = localStorage.getItem(GROUPS_KEY);
  if (rawData != null) {
    var object_data = JSON.parse(rawData);
    var keys = Object.keys(object_data);
    window.groups = {};
    for (var i = 0; i < keys.length; i++) {

      //in order to get the group functions back, a new group needs to made from the old objects
      var obj = object_data[keys[i]];
      var newGroup = new group(obj.somePeople);
      //transactions need to be cloned aswell
      var newTransactionLog = {};
      var trans_keys = Object.keys(obj.transactionLog);
      for (var z = 0; z < trans_keys.length; z++) {
        var old_trans = obj.transactionLog[trans_keys[z]];
        var newTrans = new Transaction(old_trans.name, old_trans.item, old_trans.total, old_trans.date);
        newTransactionLog[trans_keys[z]] = newTrans;
      }

      newGroup.transactionLog = newTransactionLog;
      newGroup.transactionIDs = obj.transactionIDs;
      newGroup.transNum = obj.transNum;


      //new group needs to have people log strings replaced with people
      var peopleKey = {};
      for(var z = 0; z < newGroup.somePeople; z++){
        peopleKey[newGroup.somePeople[z].name] = newGroup.somePeople[z];
      }
      
      for(var z = 0; z < newGroup.somePeople; z++){
        var pe = newGroup.somePeople[z];
        var new_log = [];
        for(var j = 0; j < pe.log; j++){
            var new_person = peopleKey[pe.log[j][0]]
            new_log.push(new_person, peopleKey[pe.log[j][1]]);
        }

        pe.log = new_log;
      }


      window.groups[keys[i]] = newGroup;
    }

  }
  else {

    //create default groups
    var default_people_1 = []
    for (var i = 0; i < people.length; i++) {
      default_people_1.push(new person(people[i]));
    }
    var default_people_2 = []
    for (var i = 0; i < people.length; i++) {
      default_people_2.push(new person(people[i]));
    }
    var default_people_3 = []
    for (var i = 0; i < people.length; i++) {
      default_people_3.push(new person(people[i]));
    }
    var default_people_4 = []
    for (var i = 0; i < people.length; i++) {
      default_people_4.push(new person(people[i]));
    }

    window.groups = { suitemates: new group(default_people_1), friends: new group(default_people_2), work_friends: new group(default_people_3), college_friends: new group(default_people_4) };
    saveGroups();

  }
}

/**
 * saves the current table into the local storage
 */
// function saveCurrentTable(tableId) {
//   var tableObj = {};
//   tableObj.log = {};
//   var keys = transactionIDs;
//   console.log(keys);
//   for (var i = 0; i < keys.length; i++) {
//     tableObj.log[keys[i]] = transactionLog.get(keys[i]);
//   }

//   tableObj.ids = transactionIDs;
//   tableObj.users = usersInGroup;

//   localStorage.setItem("table_" + tableId, JSON.stringify(tableObj));
// }

/**
 * loads the table with the given id to the current table
 */
// function loadToTable(tableId) {
//   var tableRaw = localStorage.getItem("table_" + tableId);
//   if (tableRaw != null) {
//     var tableObj = JSON.parse(tableRaw);
//     transactionIDs = [];
//     transactionLog = [];

//     usersInGroup = tableObj.users;

//     var personLs = [];
//     //create new group
//     for (var i = 0; i < usersInGroup.length; i++) {
//       personLs.push(new person(usersInGroup[i]));
//     }
//     g = new group(personLs);

//     //convert log to map
//     transactionLog = new Map();
//     var keys = tableObj.ids;
//     for (var i = 0; i < keys.length; i++) {
//       var transaction = tableObj.log[keys[i]];
//       //get person object
//       var correctPerson = null;
//       for (var z = 0; z < personLs.length; z++) {
//         if (personLs[z].name == transaction.name) {
//           correctPerson = personLs[z];
//           break;
//         }
//       }

//       g.makePayment(
//         correctPerson,
//         transaction.total,
//         transaction.item,
//         transaction.date
//       );
//     }

//     return true;
//   } else {
//     return false;
//   }
// }
/**
 * adds the current transaciton to the table and saves the table
 */

// function add_transaction() {
//   var name = document.getElementById("table_person").value;
//   var amount = document.getElementById("table_amount").value;
//   var item = document.getElementById("table_item").value;
//   var date = document.getElementById("table_date").value;

//   if (
//     name.trim() != "" &&
//     amount.trim() != "" &&
//     item.trim() != "" &&
//     date.trim() != ""
//   ) {
//     g.makePayment(new person(name), amount, item, date);

//     g.saveCurrentTable(window.currentTableId);
//     changeMainTab("home_table_" + window.currentTableId);
//   }
// }




//load current groups into data
loadGroups();

function set_correct_group_members(group) {
  var select = document.getElementById("group_member_select");
  select.innerHTML = "";

  for (var i = 0; i < group.somePeople.length; i++) {
    var new_option = document.createElement("option");
    new_option.innerHTML = group.somePeople[i].name;
    new_option.value = group.somePeople[i].name;
    select.appendChild(new_option);
  }
}

/**
 * adds the current transaction to the group
 */
function add_transaction() {
  var total = document.getElementById("tInput").value.trim();
  var item = document.getElementById("iInput").value.trim();
  var date = document.getElementById("dInput").value.trim();

  var p = document.getElementById("group_member_select").value;

  //get correct person
  var correctPerson = null;
  for(var i = 0; i< g.somePeople.length; i++){
    if(p == g.somePeople[i].name){
      correctPerson = g.somePeople[i];
    }
  }

  g.makePayment(correctPerson, total, item, date);


  g.calculate();
  g.getGroupOwe();
  g.createTable();

  saveGroups();

  document.getElementById("tInput").value = "";
  document.getElementById("iInput").value = "";
  document.getElementById("dInput").value = "";
}