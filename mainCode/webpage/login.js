//let username = document.getElementById("username").value;
//let password = document.getElementById("password").value;
/**
 * 
 * Checking for sucessful login
 */
function getLogin(username, password) {
  if (localStorage.getItem(username) != null) {
    if (localStorage.getItem(username) === password) {
      alert("Login succesful.");//redirect to homepage, session on 
      return "Login succesful.";
    } else {
      alert("Wrong password. Please try again.");
      return "Wrong password. Please try again.";
    }
  } else {
    alert("No username found.");
    return "No username found.";
  }
};

/**
 * 
 * Reset Password
 */
//let oldpassword = document.getElementById("oldPassword").value;
//let newPassword = document.getElementById("newPassword").value;
//let confirmPassword = document.getElementById("confirmPassword").value;
function resetPassword(username, password, oldPassword, newPassword, confirmPassword) {
  if (localStorage.getItem(username) != null) {
    if (password === oldPassword) {
      if (newPassword === confirmPassword) {
        localStorage.setItem(username, newPassword)
        alert("Password change successful.");
        return "Password change successful.";
      } else {
        alert("Passwords do not match.");
        return "Passwords do not match.";
      }
    } else {
      alert("Incorrect old password.");
      return "Incorrect old password.";
    }
  } else {
    alert("This email does not exist.");
    return "This email does not exist.";
  }

}
