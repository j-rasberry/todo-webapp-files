var listItems = new Map();
var listItemCounter = 0;
var projectTitle;
// id,description,completed,timestamp of completion
//[["id","Item discription",true,"timestamp"]];

//Local Storage Minipulation
function initUserData() {
    listItems.forEach(elem => {
        console.log(elem);

        if (elem[1] === "") {
            //[["id","Item discription",true,"timestamp"]];
            listItems.set(elem[0], [listItemCounter + "", "Double click to edit description", false, "TIMESTAMP"]);
            console.log(listItems.size);
            document.getElementById('item-list').innerHTML += '<li><input type="checkbox" class="list-checked-checkbox" id="' + elem[0] + '_checkbox"><p id="' + elem[0] + '_item-description" ondblclick="editEntry(' + elem[0] + ')">Double click to edit description</p> <button id= "' + elem[0] + '_delete"><img src="./res/delete.svg"></button></li>';

        } else {
            ItemDescription = document.getElementById('add-item-button-input').value

            console.log(listItems.size);
            document.getElementById('item-list').innerHTML += '<li><input type="checkbox" class="list-checked-checkbox" id="' + elem[0] + '_checkbox"><p id="' + elem[0] + '_item-description" ondblclick="editEntry(' + elem[0] + ')">' + elem[1] + '</p> <button id= "' + elem[0] + '_delete"><img src="./res/delete.svg"></button></li>';


        }

    });
}

function loadUserData() {
    window.listItems = new Map(JSON.parse(localStorage.getItem('userdata')));
    console.log("Loaded user data\n" + listItems);
    listItemCounter = listItems.size;
    document.getElementById("custom-background-input").value = localStorage.getItem("custom-background");
    document.body.setAttribute("style", "background-image:url(" + localStorage.getItem("custom-background") + ")");
    document.getElementById("header-logo-title").textContent = localStorage.getItem('list-title');
    initUserData();




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

    if (localStorage.length != 0) {
        loadUserData();
    } else {
        initUserData();
    }



})

//Action events



document.getElementById("add-item-button").addEventListener('click', function() {
    if (document.getElementById('add-item-button-input').value === "") {
        //[["id","Item discription",true,"timestamp"]];
        listItems.set(listItemCounter += 1, [listItemCounter + "", "Double click to edit description", false, "TIMESTAMP"]);
        console.log(listItems.size);
        document.getElementById('item-list').innerHTML += '<li><input type="checkbox" class="list-checked-checkbox" id="' + listItemCounter + '_checkbox"><p id="' + listItemCounter + '_item-description" ondblclick="editEntry(' + listItemCounter + ')">Double click to edit description</p> <button id= "' + listItemCounter + '_delete"><img src="./res/delete.svg"></button></li>';
        saveUserData();

    } else {
        ItemDescription = document.getElementById('add-item-button-input').value
        listItems.set(listItemCounter += 1, [listItemCounter + "", ItemDescription, false, "TIMESTAMP"]);

        console.log(listItems.size);
        document.getElementById('item-list').innerHTML += '<li><input type="checkbox" class="list-checked-checkbox" id="' + listItemCounter + '_checkbox"><p id="' + listItemCounter + '_item-description" ondblclick="editEntry(' + listItemCounter + ')">' + ItemDescription + '</p> <button id= "' + listItemCounter + '_delete"><img src="./res/delete.svg"></button></li>';
        saveUserData();


    }
    document.getElementById('add-item-button-input').value = ""

});

function editEntry(itemID) {
    console.log(document.getElementById(itemID + "_item-description").textContent);
    var descriptionPlaceholder = document.getElementById(itemID + "_item-description").textContent;

    document.getElementById(itemID + "_item-description").innerHTML = '<input type="text" id="descriptionEditInput" value="' + descriptionPlaceholder + '" onfocusout="confirmEntry(' + itemID + ')"></input>'


}

function confirmEntry(itemID) {
    var descriptionText = document.getElementById("descriptionEditInput").value;

    document.getElementById(itemID + "_item-description").innerHTML = '<p id="' + listItemCounter + '_item-description" ondblclick="editEntry(' + listItemCounter + ')>' + descriptionText + '</p>';

}

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



//TODO Functions.


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
    localStorage.setItem('list-title', descriptionText);

}