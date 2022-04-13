function getLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (localStorage.getItem(username) != null) {
    if (localStorage.getItem(username) === password) {
      alert("Login succesful.");//redirect to homepage, session on 
    } else {
      alert("Wrong password. Please try again.");
    }
  } else {
    alert("No username found.");
  }
};

//reset password
function resetPassword() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let oldpassword = document.getElementById("oldPassword").value;
  let newPassword = document.getElementById("newPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  if (localStorage.getItem(username) != null) {
    if (password === oldPassword) {
      if (newPassword === confirmPassword) {
        localStorage.set(username, newPassword)
      } else {
        alert("Passwords do not match.");
      }
    } else {
      alert("Incorrect old password.");
    }
  } else {
    alert("This email does not exist.");
  }

}

/*
//username input is email
function correctEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username))
  {
    return (true)
  }
    alert("Invalid email address.")
    return (false)
}

//checks if password works
function isStrongPassword(password){
    if(password.length < 8){
        return false;
    }
    if(password.indexOf("password") != -1){
        return false;
    }
    var upperLetter = false;
    for(var i = 0; i < password.length; i++){
        var letter = password.charCodeAt(i);
        if(letter >= 65 && letter <= 90){
            upperLetter = true;
            break;
        }
    }
    return upperLetter;
}

localStorage.setItem("username", "password");
localStorage.getItem("username");
//retreive password
let password = localStorage.getItem(key);

*/

