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
    $watchnumber = $_POST["count"];
    $name = $_POST["name"];
    $year = $_POST["year"];
    $rating = $_POST["rating"];
    $length = $_POST["length"];
    $favorite = $_POST["favorite"];
    $watched = $_POST["watchedPlayed"];


    //query to select password for a given username in the login_table
    $query = "INSERT INTO `master_watchlist` (`Username`, `Number`, `Name`, `Rating`, `Length`, `Year`, `Favorite`, `Watched`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    //initialize statement for DB connection
    $stmt = $mysqli->stmt_init();

    //check that query is valid
    if(!$stmt->prepare($query)) {
        echo "error";
    } else {
        //bind $user variable to ? in $query
        $stmt->bind_param("ssssssss", $user, $watchnumber, $name, $rating, $length, $year, $favorite, $watched);

        //execute query statement
        $stmt->execute();

        //store result as object
        $result = $stmt->get_result();

        echo($result);
    }
  }
?>