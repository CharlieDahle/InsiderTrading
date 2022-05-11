
/**
 * 
 * Verify if new username is in email format
 * 
 * @param newUsername Username that is user wants to create in email format
 * @param newPassword Password that user wants to use with the newUsername
 */
 function verifyNewUser(newUsername, newPassword) {
  if (correctEmail(newUsername)) {
    if (localStorage.getItem(newUsername) == null) {
      if (isStrongPassword(newPassword)) {
        localStorage.setItem(newUsername, newPassword);
        changeScr();
        return "New user created.";
      } else {
        return "Password must have at least 8 characters, not contain the word password and have an uppercase letter";
      }
    } else {
      newUsername = "";
      return "This email is already associated with an account. Try again.";
    }
  } else {
    return "Incorrect email format.";
  }
}

/**
 * 
 * Changes screen to login page if creating user was successful
 */
function changeScr(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      location.pathname = location.pathname.replace("createUser", "login");
      resolve();
    }, delay);
  });
}

/**
 * 
 * Ensure username is in correct email format
 * 
 * @param username Username that will be checked if it is in the correct format
 */
//username input is email
function correctEmail(username) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
    return (true)
  }
  return (false)
}

/**
 * 
 * Ensure password is strong
 * 
 * @param password Password that is checked to see if it is a strong password
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
