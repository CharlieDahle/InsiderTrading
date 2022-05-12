describe("testing function", () => {

  it("checking dropdown", () => {
    var dropdown = document.createElement("div");
    document.body.appendChild(dropdown);
    dropdown.id = "test_drop";
    toggleDropdown("test_drop");
    expect(dropdown.classList.contains("hiddenDropdown")).toBe(true);

  });




  //add circle with name
  it("adding new circle with name", () => {
    var home_div = document.createElement("div");
    home_div.id = "home";
    var temp_button = document.createElement("button");
    home_div.appendChild(temp_button);
    document.body.appendChild(home_div);
    addCircleWithName("test_circle");
    expect(home_div.children.length).toBe(2);
  });

  //add new tab to home list
  it("adding new tab to home list", () => {
    var home_div = document.createElement("div");
    home_div.id = "homeDropdown";
    document.body.appendChild(home_div);
    addTabToHomeWithName("test_circle");
    expect(home_div.children.length).toBe(1);
  });

  //save bubble
  it("saving bubble", () => {
    saveBubble("tempBubble");
    expect(localStorage.getItem(SAVED_BUBBLE_KEY) != "").toBe(true);
    expect(getSavedBubbles().length).toBe(1);
  });


  //save groups
  it("checking group save", () => {
    window.groups = { g: new group([]) };
    saveGroups();
    expect(localStorage.getItem(GROUPS_KEY) != "").toBe(true);
  });

  //set correct group members
  it("checking group memeber load mechanism", () => {
    var group_holder = document.createElement("select");
    group_holder.id = "group_member_select";
    document.body.appendChild(group_holder);
    set_correct_group_members(new group([new person("name"), new person("name2")]));
    expect(group_holder.options.length).toBe(2);
  });





});