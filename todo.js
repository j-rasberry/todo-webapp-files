var listItems = new Map([["item1",["asdf","asdff"]]]);
var listItemCounter = 0;

console.log(listItems.get("item1"));
var listItem = listItems.get("item1");
console.log(listItem[1]);
listItems.set("item2",["ffff","fffff"]);
console.log(listItems);
console.log(listItems.size);

//[["id","Display name","Item discription"]];

//Action events
document.getElementById("add-item-button").addEventListener('click',function(){
    if(document.getElementById('add-item-button-input').value === ""){
        listItems.set(listItemCounter += 1,["placeholder text","discription text"]);
        console.log(listItems.size);
        document.getElementById('item-list').innerHTML += '<li><input type="checkbox" name="" class="list-checked-checkbox" id="'+listItemCounter + '_checkbox">Item discription <button id= "'+listItemCounter + '_delete">d</button><button id= "'+listItemCounter + '_edit">e</button></li>';
    
    }else{
        ItemDescription = document.getElementById('add-item-button-input').value
        listItems.set(listItemCounter += 1,["placeholder text","discription text"])
        console.log(listItems.size);
        document.getElementById('item-list').innerHTML += '<li><input type="checkbox" name="" class="list-checked-checkbox" id="'+listItemCounter + '_checkbox"><input id="item-description>'+ ItemDescription +'</input> <button id= "'+listItemCounter + '_delete">d</button><button id= "'+listItemCounter + '_edit">e</button></li>';
    
    }

});

// document.getElementById("edit-item-button").addEventListener('click', ()=>{

// });
// document.getElementById("remove-item-button").addEventListener('click', ()=>{

// });
//Keyboard Action Events
window.addEventListener("keydown", function (event) {

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
function initDisplay(){
}