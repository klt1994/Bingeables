<?php
//host address (localhost/127.0.0.1 for self-testing, owner ip for remote connection)
$dbhost = "localhost";

//DB username
$username = "root";

//DB password
$password = "";

//DB name
$bingeables = "bingeables";

//creating new DB connection
$mysqli = new mysqli("$dbhost", "$username", "$password", "$bingeables");

//checking if incoming request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //storing username and password from recieved data (from client: "username=user&password=pass")
    $user = $_POST["username"];
    $name = $_POST["name"];

    //query to select password for a given username in the login_table
    $query = "DELETE FROM `master_watchlist` WHERE `Username`= ? AND `Name` = ? ";

    //initialize statement for DB connection
    $stmt = $mysqli->stmt_init();

    //check that query is valid
    if(!$stmt->prepare($query)) {
        echo "test";
    } else {
        //bind $user variable to ? in $query
        $stmt->bind_param("ss", $user, $name);

        //execute query statement
        $stmt->execute();
    }
  }
?>