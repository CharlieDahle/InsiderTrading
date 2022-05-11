/**
 * 
 * Event listener to add Username and password key to LocalStorage
 */
 window.addEventListener("DOMContentLoaded", domLoaded);
function domLoaded() {
    console.log(document.getElementById("newUserButton"));
    document.getElementById("newUserButton").addEventListener("click", function () {
        let newUsername = document.getElementById("newUsername").value;
        let newPassword = document.getElementById("newPassword").value;
        verifyNewUser(newUsername, newPassword);
    })
}