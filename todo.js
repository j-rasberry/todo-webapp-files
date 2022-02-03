var listItems = new Map();
var listItemCounter = 0;

//[["id","Display name","Item discription"]];

//Local Storage Minipulation
function initUserData() {

}

function loadUserData() {
    window.listItems = new Map(JSON.parse(localStorage.getItem('userdata')));
    console.log("Loaded user data\n" + listItems);
    initDisplay();

}

function saveUserData() {
    localStorage.removeItem("userdata");
    var userDataListMap = JSON.stringify(Array.from(listItems.entries()));
    localStorage.setItem("userdata", userDataListMap)
    console.log("Saved User data");
    console.log(localStorage);
}




//Window events
window.addEventListener('load', function() {
    if (localStorage.getItem('userdata') != null) {
        loadUserData();
        initalizeListItems();
    } else {
        initUserData();
    }



})
//Action events
var settingsVisible = false;
document.getElementById('settings-menu-hamburger-image').addEventListener('click', function() {
    if (settingsVisible == false) {
        document.getElementById('settings-menu-item-list').classList.remove('hidden');
        settingsVisible = true;
    } else if (settingsVisible == true) {
        document.getElementById('settings-menu-item-list').classList.add('hidden');
        settingsVisible = false;
    }


});


document.getElementById("add-item-button").addEventListener('click', function() {
    if (document.getElementById('add-item-button-input').value === "") {
        listItems.set(listItemCounter += 1, ["placeholder text", "discription text"]);
        console.log(listItems.size);
        document.getElementById('item-list').innerHTML += '<li><input type="checkbox" class="list-checked-checkbox" id="' + listItemCounter + '_checkbox"><p id="' + listItemCounter + '_item-description" ondblclick="editEntry(' + listItemCounter + ')">Placeholder text</p> <button id= "' + listItemCounter + '_delete"><img src="./res/delete.svg"></button></li>';

    } else {
        ItemDescription = document.getElementById('add-item-button-input').value
        listItems.set(listItemCounter += 1, ["placeholder text", "discription text"])
        console.log(listItems.size);
        document.getElementById('item-list').innerHTML += '<li><input type="checkbox" class="list-checked-checkbox" id="' + listItemCounter + '_checkbox"><p id="' + listItemCounter + '_item-description" ondblclick="editEntry(' + listItemCounter + ')">' + ItemDescription + '</p> <button id= "' + listItemCounter + '_delete"><img src="./res/delete.svg"></button></li>';


    }
    document.getElementById('add-item-button-input').value = ""

});

// document.getElementById("edit-item-button").addEventListener('click', ()=>{

// });
// document.getElementById("remove-item-button").addEventListener('click', ()=>{

// });
//Keyboard Action Events
window.addEventListener("keydown", function(event) {

    if (event.defaultPrevented) {
        return; // Should do nothing if the default action has been cancelled
    }

    var handled = false;
    if (event.key == 'Enter') {
        // Handle the event with KeyboardEvent.key and set handled true.
        console.log("enter was pressed.")
    } else if (event.keyCode !== undefined) {
        // Handle the event with KeyboardEvent.keyCode and set handled true.
        console.log("other was pressed.")

    }

    if (handled) {
        // Suppress "double action" if event handled
        event.preventDefault();
    }
}, true);
//Display Updates
function initDisplay() {
    listItems.forEach(item => {
        item.getItem()
    });
}

function updateDisplay() {

}

function initalizeListItems() {

}

//TODO Functions.
function editEntry(itemID) {
    console.log(document.getElementById(itemID + "_item-description").textContent);
    var descriptionPlaceholder = document.getElementById(itemID + "_item-description").textContent;

    document.getElementById(itemID + "_item-description").innerHTML = '<input type="text" id="descriptionEditInput" value="' + descriptionPlaceholder + '" onfocusout="confirmEntry(' + itemID + ')"></input>'


}

function confirmEntry(itemID) {
    var descriptionText = document.getElementById("descriptionEditInput").value;

    document.getElementById(itemID + "_item-description").innerHTML = '<p id="' + listItemCounter + '_item-description" ondblclick="editEntry(' + listItemCounter + ')>' + descriptionText + '</p>';

}

document.getElementById('header-logo-title').addEventListener('dblclick', function() {
        editTitle();
    }

);


function editTitle() {
    console.log(document.getElementById("header-logo-title").textContent);
    var descriptionPlaceholder = document.getElementById("header-logo-title").textContent;

    document.getElementById("header-logo-title").innerHTML = '<input type="text" id="descriptionEditInput" value="' + descriptionPlaceholder + '" onfocusout="confirmTitle()"></input>'


}

function confirmTitle() {
    var descriptionText = document.getElementById("descriptionEditInput").value;

    document.getElementById("header-logo-title").innerHTML = descriptionText;

}