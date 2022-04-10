document.getElementById("newUserButton").addEventListener("click", function() {
  let newUsername = document.getElementById("newUsername").value;
  let newPassword = document.getElementById("newPassword").value;

  if(localStorage.getItem(newUsername)!= null){
    alert("This email is already associated with an account. Try again."); 
    newUsername = ""; 
  }else{
    localStorage.setItem(newUsername, newPassword);
  } 
});
 
