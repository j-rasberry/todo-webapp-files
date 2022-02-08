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
document.getElementById('settings-menu-item-clear-data').addEventListener('click', function() {
    localStorage.removeItem('userdata');
    localStorage.removeItem('custom-background');
    listItems.clear();
    document.getElementById('item-list').innerHTML = "";
    document.getElementById("custom-background-input").value = null;
    document.body.setAttribute("style", "background-image:url('')");


});
document.getElementById('custom-background-input').addEventListener('focusout', function() {
    let imageURL = document.getElementById("custom-background-input").value;
    document.body.setAttribute("style", "background-image:url('" + imageURL + "')");
    //save image url for furture reference.
    localStorage.setItem("custom-background", imageURL)

});