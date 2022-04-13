/**
 *person class
 *takes a name a
 */
let myGroup;
class person {
  constructor(name) {
    this.name = name;
    this.total = 0;
  }
}
/**
 *group class
 *take a list of person objects
 */
class group {
  constructor(somePeople) {
    this.groupsize = somePeople.length;
    this.somePeople = somePeople;
    this.transNum = 0;
    this.transaction = [[person, person, 0]];

    this.pos = [];
    this.neg = [];
  }
  makePayment(person, amt) {
    //neg amounts mean in debt
    let owed = amt / this.groupsize;
    for (let i = 0; i < this.groupsize; i++) {
      this.somePeople[i].total -= owed;
    }
    person.total += owed * this.groupsize;
  }
  calculate() {
    var self = this;
    self.makeLists();
    if (self.pos.length > 0 && self.neg.length > 0) {
      for (let i = 0; i < self.pos.length; i++) {
        let amount = Math.min(self.pos[i].total, Math.abs(self.neg[i].total));
        this.transaction[this.transNum] = [self.pos[i], self.neg[i], amount]; //Keeps track of who pays who what
        if (self.pos[i].total + self.neg[i].total > 0) {
          self.pos[i].total = self.pos[i].total + self.neg[i].total;
          self.neg[i].total = 0;
        } else if (self.pos[i].total + self.neg[i].total < 0) {
          self.neg[i].total = self.pos[i].total + self.neg[i].total;
          self.pos[i].total = 0;
        } else if (self.pos[i].total + self.neg[i].total == 0) {
          self.pos[i].total = 0;
          self.neg[i].total = 0;
        }
        console.log(
          self.neg[i].name + " paid " + self.pos[i].name + " " + amount
        );
      }
      this.transNum++;
      self.calculate();
    }
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
}

function main() {
  let a = new person("a");
  let b = new person("b");
  let c = new person("c");
  let d = new person("d");
  let e = new person("e");
  let g = new group([a, b, c, d, e]);
  g.makePayment(a, 21);
  g.makePayment(b, 41);
  g.makePayment(c, 1);
  g.makePayment(d, 8);
  g.calculate();
}
