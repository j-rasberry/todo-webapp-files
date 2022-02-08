var listItems = new Map();
var listItemCounter = 0;
var projectTitle;


//Local Storage Minipulation
function initUserData() {
    listItems.forEach(elem => {

        if (elem[1] === "") {
            listItems.set(elem[0], [listItemCounter + "", "Double click to edit description", false, "TIMESTAMP"]);
            document.getElementById('item-list').innerHTML += '<li id="list-item-' + elem[0] + '"><input type="checkbox" class="list-checked-checkbox" id="' + elem[0] + '_checkbox"><p id="' + elem[0] + '_item-description" ondblclick="editEntry(' + elem[0] + ')">Double click to edit description</p> <button class="deleteButton" id= "' + elem[0] + '_delete" onclick="deleteEntry(' + elem[0] + ')"><img src="./res/delete.svg"></button></li>';

        } else {
            ItemDescription = document.getElementById('add-item-button-input').value

            document.getElementById('item-list').innerHTML += '<li id="list-item-' + elem[0] + '"><input type="checkbox" class="list-checked-checkbox" id="' + elem[0] + '_checkbox"><p id="' + elem[0] + '_item-description" ondblclick="editEntry(' + elem[0] + ')">' + elem[1] + '</p> <button class="deleteButton" id= "' + elem[0] + '_delete" onclick="deleteEntry(' + elem[0] + ')"><img src="./res/delete.svg"></button></li>';


        }

    });
}

function loadUserData() {
    window.listItems = new Map(JSON.parse(localStorage.getItem('userdata')));
    listItemCounter = listItems.size;
    document.getElementById("custom-background-input").value = localStorage.getItem("custom-background");
    document.body.setAttribute("style", "background-image:url(" + localStorage.getItem("custom-background") + ")");
    if (localStorage.getItem('list-title') == null) {
        document.getElementById("header-logo-title").textContent = "New Project";

    } else {
        document.getElementById("header-logo-title").textContent = localStorage.getItem('list-title');

    }
    initUserData();




}

function saveUserData() {
    localStorage.removeItem("userdata");
    var userDataListMap = JSON.stringify(Array.from(listItems.entries()));
    localStorage.setItem("userdata", userDataListMap)
}




//Window events
window.addEventListener('load', function() {

    if (localStorage.getItem('userdata') != '[]' || localStorage.getItem('list-title') != null) {

        loadUserData();
    } else {
        initUserData();
    }




})

//Action events


window.addEventListener("keydown", function(event) {

    if (event.defaultPrevented) {
        return;
    }
    var handled = false;
    if (event.key == 'Enter') {

        if (document.getElementById('add-item-button-input') === document.activeElement) {
            addItemToList();
        }
    } else if (event.keyCode !== undefined) {}
    if (handled) {
        event.preventDefault();
    }
}, true);

document.getElementById("add-item-button").addEventListener('click', function() {

    addItemToList();
});

function addItemToList() {
    if (document.getElementById('add-item-button-input').value === "") {
        listItems.set(listItemCounter += 1, [listItemCounter + "", "Double click to edit description", false, "TIMESTAMP"]);
        document.getElementById('item-list').innerHTML += '<li id="list-item-' + listItemCounter + '"><input type="checkbox" class="list-checked-checkbox" id="' + listItemCounter + '_checkbox"><p id="' + listItemCounter + '_item-description" ondblclick="editEntry(' + listItemCounter + ')">Double click to edit description</p> <button class="deleteButton" id= "' + listItemCounter + '_delete" onclick="deleteEntry(' + listItemCounter + ')"><img src="./res/delete.svg"></button></li>';
        saveUserData();

    } else {
        ItemDescription = document.getElementById('add-item-button-input').value
        listItems.set(listItemCounter += 1, [listItemCounter + "", ItemDescription, false, "TIMESTAMP"]);

        document.getElementById('item-list').innerHTML += '<li id="list-item-' + listItemCounter + '"><input type="checkbox" class="list-checked-checkbox" id="' + listItemCounter + '_checkbox"><p id="' + listItemCounter + '_item-description" ondblclick="editEntry(' + listItemCounter + ')">' + ItemDescription + '</p> <button class="deleteButton" id= "' + listItemCounter + '_delete" onclick="deleteEntry(' + listItemCounter + ')"><img src="./res/delete.svg"></button></li>';
        saveUserData();


    }
    document.getElementById('add-item-button-input').value = ""
}

function editEntry(itemID) {
    document.getElementById(itemID + "_item-description").removeAttribute("ondblclick");
    var descriptionPlaceholder = document.getElementById(itemID + "_item-description").textContent;

    document.getElementById(itemID + "_item-description").innerHTML = '<input type="text" id="descriptionEditInput" value="' + descriptionPlaceholder + '" onfocusout="confirmEntry(' + itemID + ')"></input>'


}

function confirmEntry(itemID) {
    document.getElementById(itemID + "_item-description").setAttribute("ondblclick", "editEntry(" + itemID + ")");
    var descriptionText = document.getElementById("descriptionEditInput").value;
    document.getElementById(itemID + "_item-description").innerHTML = descriptionText;

}

function deleteEntry(itemID) {
    listItemID = "list-item-" + itemID;
    document.getElementById(listItemID).remove();

    listItems.delete(itemID);
    saveUserData();

}
document.getElementById('header-logo-title').addEventListener('dblclick', function() {
        editTitle();
    }

);


function editTitle() {
    var descriptionPlaceholder = document.getElementById("header-logo-title").textContent;

    document.getElementById("header-logo-title").innerHTML = '<input type="text" id="descriptionEditInput" value="' + descriptionPlaceholder + '" onfocusout="confirmTitle()"></input>'


}

function confirmTitle() {
    var descriptionText = document.getElementById("descriptionEditInput").value;

    document.getElementById("header-logo-title").innerHTML = descriptionText;
    localStorage.setItem('list-title', descriptionText);

}