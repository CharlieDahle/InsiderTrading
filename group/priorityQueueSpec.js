describe("push puts on the queue in the proper order", () => {
  beforeEach(() => {
    pq = new PriorityQueue();
    pq.push(0, 10);
    pq.push(2, 5);
    pq.push(1, 7);
  });
  it("the queue should not be empty", function () {
    expect(pq.isEmpty()).toBe(false);
  });
  it("the top element should be 10", function () {
    expect(pq.topElement()).toBe(10);
  });
  it("the top priotity should be 0", function () {
    expect(pq.topPriority()).toBe(0);
  });
  it("the queue should pop off 10", function () {
    expect(pq.pop()).toBe(10);
  });
  it("the top element should now be 7", function () {
    expect(pq.pop()).toBe(10);
    expect(pq.topElement()).toBe(7);
  });
  it("the top priotity should now be 1", function () {
    expect(pq.pop()).toBe(10);
    expect(pq.topPriority()).toBe(1);
  });
  it("the queue should pop off 7 after 10", function () {
    expect(pq.pop()).toBe(10);
    expect(pq.pop()).toBe(7);
  });
  it("the top element should now be 5", function () {
    expect(pq.pop()).toBe(10);
    expect(pq.pop()).toBe(7);
    expect(pq.topElement()).toBe(5);
  });
  it("the top priotity should now be 2", function () {
    expect(pq.pop()).toBe(10);
    expect(pq.pop()).toBe(7);
    expect(pq.topPriority()).toBe(2);
  });
  it("the queue should not be empty", function () {
    pq.pop();
    pq.pop();
    pq.pop();
    expect(pq.isEmpty()).toBe(true);
  });
});

describe("pop takes the proper element off the queue and returns it", () => {
  beforeEach(() => {
    pq = new PriorityQueue();
    pq.push(1, 10);
    pq.push(3, 5);
    pq.push(2, 7);
  });
  it("the queue should pop off 10", function () {
    expect(pq.pop()).toBe(10);
  });
  it("if I push something onto the top and then pop it should be the new element", function () {
    pq.push(0, 23);
    expect(pq.pop()).toBe(23);
  });
  it("pops are correct in correct order", function () {
    expect(pq.pop()).toBe(10);
    expect(pq.pop()).toBe(7);
    expect(pq.pop()).toBe(5);
    //want to test to see if it would throw the next pop but it didnt work :/
    //expect(pq.pop()).toThrow();
  });
});
describe("clear properly emptys the queue", function () {
  beforeEach(() => {
    pq = new PriorityQueue();
    pq.push(0, 10);
    pq.push(2, 5);
    pq.push(1, 7);
  });
  it("clear emptys a queue with multiple elements", function () {
    expect(pq.isEmpty()).toBe(false);
    pq.clear();
    expect(pq.isEmpty()).toBe(true);
  });
  it("an empty queue stays the same", function () {
    pq.pop();
    pq.pop();
    pq.pop();
    expect(pq.isEmpty()).toBe(true);
    pq.clear();
    expect(pq.isEmpty()).toBe(true);
  });
  it("can clear large queues", function () {
    for (var i = 11; i < 1000000; i++) {
      pq.push(i, i);
    }
    pq.clear();
    expect(pq.isEmpty()).toBe(true);
  });
});
/* would like to know what would happen when there are 2 of the same element */
describe("change priority can reorder the queue", function () {
  beforeEach(() => {
    pq = new PriorityQueue();
    pq.push(0, 10);
    pq.push(2, 5);
    pq.push(1, 7);
  });
  it("change priority changes the priority to the number set", function () {
    pq.changePriority(50, 10);
    expect(pq.getPriority(10)).toBe(50);
  });
  it("change priority can move the front of the queue", function () {
    pq.changePriority(100, 10);
    expect(pq.getPriority(10)).toBe(100);
    expect(pq.topElement()).toBe(7);
  });
  it("change priority can move an element to the front of the queue", function () {
    pq.changePriority(100, 10);
    pq.changePriority(0, 5);
    expect(pq.getPriority(5)).toBe(0);
    expect(pq.topElement()).toBe(5);
  });
});
