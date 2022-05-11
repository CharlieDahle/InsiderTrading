/**
 * 
 * Checking for sucessful login
 * 
 * @param username Username that is inputed to access account
 * @param password Password that is unpupted to access account
 */
function getLogin(username, password) {
  if (localStorage.getItem(username) != null) {
    if (localStorage.getItem(username) === password) {
      changeScr();
      return "Login succesful.";//redirect to homepage
    } else {
      return "Wrong password. Please try again.";
    }
  } else {
    return "No username found.";
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
 * Reset Password for an existing account
 * 
 * @param username Username associated with account that user wants to change password for
 * @param oldPassword The exisiting password that is linked with the account
 * @param newPassword The new password that that user wants to use
 * @param confirmPassword Confirmting that the the passwords are the same
 */
function resetPassword(username, oldPassword, newPassword, confirmPassword) {
  if (localStorage.getItem(username) != null) {
    if (localStorage.getItem(username) === oldPassword) {
      if (newPassword === confirmPassword) {
        localStorage.setItem(username, newPassword)
        changeScr2();
        return "Password reset succesful.";

      } else {
        return "Passwords do not match.";
      }
    } else {
      return "Incorrect old password.";
    }
  } else {
    return "This email does not exist.";
  }
}

/**
 * 
 * Change screen method after password is reset to login page
 */
function changeScr2(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      location.pathname = location.pathname.replace("setPassword", "login");
      resolve();
    }, delay);
  });
}
