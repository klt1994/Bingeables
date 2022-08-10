var currentTab;
var username;
var page;
var deleteName;
var counter = 0;

//onclick function for "tab" buttons, creates a new http request for all movies or games (depends on the current page) belonging to the username 
function getData(event, tabName) {
    //tabClick function call to adjust CSS properties
    tabClick(event, tabName);
    
    //get html filename and store it as "page"
    var path = window.location.pathname;
    page = path.split("/").pop();

    //format url according to current page
    var url = "";
    if (page == "watchlist.html") {
        url = "../php/get-watchlist.php";
    } else {
        url = "../php/get-gamelist.php";
    }

    //create new request
    var http = new XMLHttpRequest();

    //define callback function
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //since we are recieving data in JSON format we parse the responseText
            var response = JSON.parse(this.responseText);

            //showList function call passing the JSON object array
            showList(response);
        }
    }

    //open request
    http.open("POST", url, true);

    //set data format in request header
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //send request
    http.send("username=" + username);
}

//CSS adjust function, highlights the currently selected tab and shows tab table
function tabClick(event, tabName) {
    var tabs, otherContent, tableName;
    
    //set current tab
    currentTab = tabName;

    //get all tab content and clear it
    otherContent = document.getElementsByClassName("list-content");
    for (var i = 0; i < otherContent.length; i++) {
        otherContent[i].style.display = "none";
    }
    
    //unhighlight all tabs
    tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    //set tableName according to tabName
    if (tabName == "all") {
        tableName = "all";
    } else if (tabName == "customLists") {
        tableName = "customListsTable";
    } else {
        tableName = "table";
    }

    //show selected tab content
    document.getElementById(tableName).style.display = "block";

    //highlight selected tab
    event.currentTarget.className += " active";
}


//callback function for http request, for displaying data recieved from database
function showList(data) {
    counter = data.length;

    //clear/reset tables
    document.getElementById("allTableBody").innerHTML = "";
    document.getElementById("tableBody").innerHTML = "";
    
    //loop that cycles through "data", the JSON object array
    for (var i = 0; i <= data.length; i++) {
        //create a new table row for each JSON object
        var row = document.createElement("tr");
            
        //create table column for name
        var nameCol = document.createElement("td");
        nameCol.innerHTML = data[i].Name;
        
        //create table column for rating
        var ratingCol = document.createElement("td");
        ratingCol.innerHTML = data[i].Rating;

        //create table column for length
        var lengthCol = document.createElement("td");
        lengthCol.innerHTML = data[i].Length;
        
        //create table column for year
        var yearCol = document.createElement("td");
        yearCol.innerHTML = data[i].Year;
            
        //create table column for favorite, change database "1/0" to "Yes/No"
        var favoriteCol = document.createElement("td");
        if (data[i].Favorite == "1") {
            favoriteCol.innerHTML = "Yes";
        } else {
            favoriteCol.innerHTML = "No";
        }
        
        //create table column for watched, change database "1/0" to "Yes/No"
        var watchedCol = document.createElement("td");
        if (data[i].Watched == "1" || data[i].Played) {
            watchedCol.innerHTML = "Yes";
        } else {
            watchedCol.innerHTML = "No";
        }
            
        //switch statement that selectively appends the above columns to "row" depending on which page/tab are being viewed
        //once the columns are appended to "row", "row" is appended to the selected tab's table
        switch(currentTab) {
            case "all":
                row.appendChild(nameCol);
                row.appendChild(ratingCol);
                if (page == "watchlist.html") {
                    row.appendChild(lengthCol);
                }
                row.appendChild(yearCol);
                row.appendChild(favoriteCol);
                row.appendChild(watchedCol);
                document.getElementById("allTableBody").appendChild(row);
                break;
            case "favorites":  
                if (data[i].Favorite == "1") {
                    row.appendChild(nameCol);
                    row.appendChild(ratingCol);
                    if (page == "watchlist.html") {
                        row.appendChild(lengthCol);
                    }
                    row.appendChild(yearCol);
                }
                document.getElementById("tableBody").appendChild(row);
                break;
            case "watched":
                if (data[i].Watched == "1" || data[i].Played == "1") {
                    row.appendChild(nameCol);
                    row.appendChild(ratingCol);
                    if (page == "watchlist.html") {
                        row.appendChild(lengthCol);
                    }
                    row.appendChild(yearCol);
                }
                document.getElementById("tableBody").appendChild(row);
                break;
            case "haventWatched":
                if (data[i].Watched == "0" || data[i].Played == "0") {
                    row.appendChild(nameCol);
                    row.appendChild(ratingCol);
                    if (page == "watchlist.html") {
                        row.appendChild(lengthCol);
                    }
                    row.appendChild(yearCol);
                }
                document.getElementById("tableBody").appendChild(row);
                break;
        }    
    } 
}

function addEntry() {
    var count = counter + 1;
    var name = document.getElementById("name").value;
    var year = document.getElementById("year").value;
    var ratingRadioButtons = document.getElementsByName("radioRatingButtons");
    var rating;
    for(var i = 0; i < ratingRadioButtons.length; i++) {
        if (ratingRadioButtons[i].checked) {
            rating = ratingRadioButtons[i].value + "/5";
        }
    }
    
    var favorite;
    if (document.getElementById("favoriteYes").checked) {
        favorite = "1";
    } else {
        favorite = "0";
    }

    var watchedPlayed;
    if (document.getElementById("yes").checked) {
        watchedPlayed = "1";
    } else {
        watchedPlayed = "0";
    }

    var length;

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("allTab").click();
        }
    };

    if (page == "watchlist.html") {
        length = document.getElementById("hour").value + "h " + document.getElementById("min").value + "m";
        http.open("POST", "../php/add-movie.php", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("username=" + username + "&count=" + count + "&name=" + name + "&year=" + year + "&rating=" + rating + "&length=" + length + "&favorite=" + favorite + "&watchedPlayed=" + watchedPlayed);
    } else {
        http.open("POST", "../php/add-game.php", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("username=" + username + "&count=" + count + "&name=" + name + "&year=" + year + "&rating=" + rating  + "&favorite=" + favorite + "&watchedPlayed=" + watchedPlayed);
    }
    
    openForm();
}

function openForm() {
    window.location.reload;
    if (document.getElementById("form").style.display == "block") { 
        document.getElementById("form").style.display = "none";
        clearForm();
    } else { 
        document.getElementById("form").style.display = "block";
    }  
}

function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchFilter");
    filter = input.value.toUpperCase();
    
    if (currentTab == "all") {
        table = document.getElementById("allTable");
    } else {
        
        table = document.getElementById("otherTable");
    }
    
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        }
    }
}

function remove() {
    //create new request
    var http = new XMLHttpRequest();

    //define callback function
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("allTab").click();
            openDeleteForm();
        }
    }
    
    if (page == "watchlist.html") {
        http.open("POST", "../php/delete-movie.php", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("username=" + username + "&name=" + deleteName);
    } else {
        http.open("POST", "../php/delete-game.php", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("username=" + username + "&name=" + deleteName);
    }

}

function openDeleteForm() {
    window.location.reload;
    if (document.getElementById("deleteForm").style.display == "block") { 
        document.getElementById("deleteForm").style.display = "none";
        clearForm();
    } else { 
        document.getElementById("deleteForm").style.display = "block";
    }  
}

function selectRow(event) { 
    var table = event.currentTarget;
    var cells = table.getElementsByTagName("td");
    
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;
            var rowSelected = table.getElementsByTagName("tr")[rowId];
            var data = rowSelected.getElementsByTagName("td");
            deleteName = data[1].innerText;
            openDeleteForm();
        }
    }  
}

function start() {
    username = localStorage.getItem("username");
    document.getElementById("usernameText").innerHTML = username;
    document.getElementById("allTab").click();
    var select = document.getElementById("min");
    for (var i = 0; i <= 59; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        select.appendChild(option);
    }
}

window.addEventListener("load",start,false);