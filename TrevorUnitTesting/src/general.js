
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