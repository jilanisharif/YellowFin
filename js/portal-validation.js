var invoke_make_blank = true;

$("#loginForm").submit(function(e) {
  e.preventDefault();
});

function pageType() {
  localStorage.setItem('isPortal', document.getElementsByClassName("portal").length);
}

function validate() {
  const username = document.getElementById("first_name").value;

  localStorage.setItem('loggingStatus', true);
  localStorage.setItem('username', username || "Julie");

  window.location = "portal-agentprofile.html";

  return true;
}

function loggingToggle() {
  const loggedStatus = localStorage.getItem('loggingStatus');
  const username = localStorage.getItem('username');
  const isBanking = localStorage.getItem('isBanking');
  if (loggedStatus) {
    document.getElementsByClassName("login-section")[0].innerHTML = "<div class='control-label'>Welcome, " + username + "</div><a href='index.html' id='log-out'><span class='tooltiptext'>Log Out</span><img id='logout-icon' src='images/logout.png'</a>";
    logOut();

  } else {
      if (isBanking > 0) {
        document.getElementsByClassName("login-section")[0].innerHTML = "<a href='login-portal.html' class='btn btn-default log-in'>Log In</a>";
      }  else {
        document.getElementsByClassName("login-section")[0].innerHTML = "<a href='login-insurance.html' class='btn btn-default log-in'>Log In</a>";
      }
  }
}

function logOut() {
  const logOutButton =  document.getElementById("log-out");
  logOutButton.addEventListener("click", function() {
    localStorage.removeItem('loggingStatus', 'username');
  });
}
