
function getReccomendations(type) {
    //get html filename and store it in page
    var path = window.location.pathname;
    page = path.split("/").pop();

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            showData(response);
        }
    }

    http.open("POST", "../php/get-recommendations.php");

    //set data format in request header
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    http.send("type=" + type);
}

function showData(response) {
    //var k = '<tbody>';
//Add a header
var table = document.getElementById("allTableBody1");
table.innerHTML = "";

var nameHeaderCell = document.createElement("th");
var ratingHeaderCell = document.createElement("th");
var yearHeaderCell = document.createElement("th");
var favoriteHeaderCell = document.createElement("th");

    //Add the rest of the data to the table
    for (var i = 0; i <= response.length; i++) {
        var name = response[i].Name;
        var rating = response[i].Rating;
        var year = response[i].Year;
        var favorite = response[i].Favorite;
        if (favorite == "1") {
            favorite = "Yes";
        } else {
            favorite = "No";
        }

        var tr = document.createElement("tr");

        var nameCell = document.createElement("td");
        var ratingCell = document.createElement("td");
        var yearCell = document.createElement("td");
        var favoriteCell = document.createElement("td");

        nameCell.appendChild(document.createTextNode(name));
        ratingCell.appendChild(document.createTextNode(rating));
        yearCell.appendChild(document.createTextNode(year));
        favoriteCell.appendChild(document.createTextNode(favorite));

        tr.appendChild(nameCell);
        tr.appendChild(ratingCell);
        tr.appendChild(yearCell);
        tr.appendChild(favoriteCell);

        table.appendChild(tr);

    }
}