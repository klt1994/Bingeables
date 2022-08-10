<?php 
$dbhost = "localhost";

//DB username
$username = "root";

//DB password
$password = "";

//DB name
$bingeables = "bingeables";

//creating new DB connection
$mysqli = new mysqli("$dbhost", "$username", "$password", "$bingeables");

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $type = $_POST["type"];

    $query;

    if ($type == "movies")
    {
        //query to select all rows matching username in master_watchlist
        $query = "SELECT * FROM `master_watchlist` ORDER by rand() limit 5";
    } 
    else 
    {
        $query = "SELECT * FROM `master_gamelist` ORDER by rand() limit 5";
    }

    //initialze a database statement
    $stmt = $mysqli->stmt_init();

    //check query
    if(!$stmt->prepare($query)) 
    {
        echo "query failed";
    } 
    else
    {
        //execute query statement
        $stmt->execute();

        //get result from query
        $result = $stmt->get_result();

        //format data into JSON
        $results = array();
        while($row = mysqli_fetch_array($result))
        {
            if ($type == "movies") 
            {
                $results[] = array(
                    'Name' => $row['Name'],
                    'Rating' => $row['Rating'],
                    'Length' => $row['Length'],
                    'Year' => $row['Year'],
                    'Favorite' => $row['Favorite'],
                    'Watched' => $row['Watched']
                );
            }
            else
            {
                $results[] = array(
                    'Name' => $row['Name'],
                    'Rating' => $row['Rating'],
                    'Year' => $row['Year'],
                    'Favorite' => $row['Favorite'],
                    'Played' => $row['Played']
                );
            }
        }
        $json = json_encode($results);

        //send JSON
        echo $json;
    }
}
?>