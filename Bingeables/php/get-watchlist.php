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

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $user = $_POST["username"];

    $query = "SELECT `Number`, `Name`, `Rating`, `Length`, `Year`, `Favorite`, `Watched` FROM `master_watchlist` WHERE `Username` = ?";

    $stmt = $mysqli->stmt_init();

    if(!$stmt->prepare($query)) 
    {
        echo "query failed";
    } 
    else 
    {
        $stmt->bind_param("s", $user);

        $stmt->execute();

        $result = $stmt->get_result();

        $results = array();
        while($row = mysqli_fetch_array($result))
        {
            $results[] = array(
                'Number' => $row['Number'],
                'Name' => $row['Name'],
                'Rating' => $row['Rating'],
                'Length' => $row['Length'],
                'Year' => $row['Year'],
                'Favorite' => $row['Favorite'],
                'Watched' => $row['Watched']
            );
        }

        $json = json_encode($results);
        echo $json;
        // $counter = 0;

        // while($row = $result->fetch_array(MYSQLI_ASSOC))
        // {
        //     foreach($row as $r)
        //     {
        //         $counter++;
        //         echo $r;
        //         if ($counter % 7 == 0) 
        //         {
        //             echo "$";
        //         }
        //         else
        //         {
        //             echo "@";
        //         }
        //     }
        // }
    }
}
?>