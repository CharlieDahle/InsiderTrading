/**
 * 
 * Checking for sucessful login
 */
function getLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (localStorage.getItem(username) != null) {
    if (localStorage.getItem(username) === password) {
      changeScr();
      alert("Login succesful.");//redirect to homepage
      return false;
    } else {
      alert("Wrong password. Please try again.");
    }
  } else {
    alert("No username found.");
  }
}

function changeScr(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      location.pathname = location.pathname.replace("login", "homepage");
      resolve();
    }, delay);
  });
}


/**
 * 
 * Reset Password
 */
function resetPassword() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let oldPassword = document.getElementById("oldPassword").value;
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
