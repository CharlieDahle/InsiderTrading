/**
 * 
 * toggles the dropdown for the menu item with given id
 */

 function toggleDropdown(id){
    var dropdownElement = document.getElementById(id);


    /**
     * toggle dropdown
     */
    dropdownElement.classList.toggle("hiddenDropdown");
}


/**
 * changes the main tab to the given group
 */
function changeMainTab(tabName){


    var tabContent = document.getElementById("tabcontent");
    tabContent.innerHTML = "";
    if(tabName == "home"){
        tabContent.appendChild(createCircleGroup("Suitemates"));
        tabContent.appendChild(createCircleGroup("Friends"));
        tabContent.appendChild(createCircleGroup("Work Friends"));
        tabContent.appendChild(createCircleGroup("College Friends"));
        
        var plusButton = document.createElement("div");
        plusButton.classList.add("circleGroup");
        var circleText = document.createElement("h1");
        circleText.innerHTML = "+";
        plusButton.appendChild(circleText);

        tabContent.appendChild(plusButton);
    }
    else if(tabName == "settings"){
        
    }

}


/**
 * returns a new circle group with the given text
 */
function createCircleGroup(text){
    var parentDiv = document.createElement("div");
    parentDiv.classList.add("circleGroup");
    var circleText = document.createElement("h3");
    circleText.innerHTML = text;
    parentDiv.appendChild(circleText);
    return parentDiv;
}