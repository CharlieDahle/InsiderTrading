

/**
 * 
 * Verify if new username is in email format
 */
function verifyNewUser(newUsername, newPassword) {

  if (correctEmail(newUsername)) {
    if (localStorage.getItem(newUsername) != null) {
      alert("This email is already associated with an account. Try again.");
      newUsername = "";
    } else {
      if (isStrongPassword(newPassword)) {
        localStorage.setItem(newUsername, newPassword);
      } else {
        alert("Password must have at least 8 characters, not contain the word password and have an uppercase letter");
      }

      alert("New user created.");
    }
  } else {
    alert("Incorrect email format.");
  }
}

/**
 * 
 * Ensure username is in correct email format
 */
//username input is email
function correctEmail(username) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
    return (true)
  }
  //alert("Invalid email address.")
  return (false)
}

/**
 * 
 * Ensure password is strong
 */
function isStrongPassword(password) {
  if (password.length < 8) {
    return false;
  }
  if (password.indexOf("password") != -1) {
    return false;
  }
  var upperLetter = false;
  for (var i = 0; i < password.length; i++) {
    var letter = password.charCodeAt(i);
    if (letter >= 65 && letter <= 90) {
      upperLetter = true;
      break;
    }
  }
  return upperLetter;
}
