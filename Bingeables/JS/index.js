function checkLogin() {
    //get input values
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    //store username in local storage to be accessed in watchlist.html
    localStorage.setItem("username", user);
    
    //create new request
    var http = new XMLHttpRequest();

    //callback function definition
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == "true") {
                window.location.href = "../HTML/profile.html";
            } else {
                alert("Incorrect username or password. Please try again.");
            }
        }
    };

    //open request as POST to login.php
    http.open("POST", "../php/login.php", true);

    //set data format to header
    //todo: convert to JSON
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //send user and pass data using ^ format
    http.send("username=" + user + "&password=" + pass);
}
