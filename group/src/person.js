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
  /**
   *
   * @param {person object} person
   * @param {amount of money they are spending} amt
   * @param {string of what the money is spent on} item
   * @param {when the money was spent} date
   * updates all people's totals with the amount owed to the person who made the payement
   */
  makePayment(person, amt, item, date) {
    //neg amounts mean in debt
    // transactionLog.set(
    //   makeid(5),
    //   new Transaction(person.name, item, amt, date)
    // );
    let owed = amt / this.groupsize;
    for (let i = 0; i < this.groupsize; i++) {
      this.somePeople[i].total -= owed;
    }
    person.total += owed * this.groupsize;
  }
  /**
   * calculates the amount each person owes
   *
   */
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
    // for (let k = 0; k < self.groupsize; k++) {
    //   console.log(tempTotal[k]);
    //   self.somePeople[k].total = tempTotal[k];
    // } // sets total back to what it was
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

        console.log("here");
        console.log(this.neg[forNeg].total);
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
        // console.log(
        //   this.transaction[i][0].name +
        //     " paid " +
        //     this.transaction[i][1].name +
        //     " $" +
        //     this.transaction[i][2].toFixed(2)
        // );
        // answerDiv.appendChild(p); //errors when not attached
      }
    }
  }
  clearTransactionHistory() {
    // unfinished
    //needs to also clear the table
    this.transNum = 0;
    this.transaction = [[]];
    for (let i = 0; i < this.groupsize; i++) {
      this.somePeople[i].total = 0;
      this.somePeople[i].logIndex = 0;
      this.somePeople[i].log = [[]];
    }
  }
}

function main() {
  let ben = new person("ben");
  let tina = new person("tina");
  let charlie = new person("charlie");
  //let trevor = new person("trevor");
  let g = new group([ben, tina, charlie]);
  g.makePayment(tina, 12, "weed", "04/14/20");
  g.makePayment(ben, 8, "weed", "04/14/20");
  //console.log(ben.total);
  //console.log(tina.total);
  //console.log(charlie.total);
  g.makeLists();
  //   console.log(ben.total);
  //   console.log(tina.total);
  //   console.log(charlie.total);
  //console.log(g.neg[0].total);
  g.calculate();
}
function mainTwo() {
  let ben = new person("ben");
  let tina = new person("tina");
  let charlie = new person("charlie");
  let trevor = new person("trevor");
  let g = new group([ben, tina, charlie]);
  g.makePayment(charlie, 25, "breakfast", "10/12/2022");
  g.makePayment(charlie, 14, "lunch", "10/12/2022");
  g.makePayment(charlie, 29, "dinner", "10/12/2022");
  g.makePayment(charlie, 20, "video game", "10/12/2022");
  g.makePayment(tina, 11, "cookies", "04/23/2022");
  g.makePayment(tina, 420, "weed", "04/23/2022");
  g.makePayment(tina, 28, "concert tickets", "04/23/2022");
  g.makePayment(tina, 18, "detergent", "04/23/2022");
  g.makePayment(ben, 500, "bees", "04/13/2022");
  g.makePayment(trevor, 11, "1s", "11/11/2011");
  g.calculate();
}
