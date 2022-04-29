

/**
 * 
 * Verify if new username is in email format
 */
function verifyNewUser() {
  let newUsername = document.getElementById("username").value;
  let newPassword = document.getElementById("password").value;

  if (correctEmail(newUsername)) {
    if (localStorage.getItem(newUsername) == null) {
      if (isStrongPassword(newPassword)) {
        localStorage.setItem(newUsername, newPassword);
        changeScr();
        alert("New user created.");
        return false;
      } else {
        alert("Password must have at least 8 characters, not contain the word password and have an uppercase letter");
      }
    } else {
      alert("This email is already associated with an account. Try again.");
      newUsername = "";
    }
  } else {
    alert("Incorrect email format.");
  }
}


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
