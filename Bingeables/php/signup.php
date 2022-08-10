<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bingeables";

$id = null;
$user = $_POST["username"];
$pass = $_POST["password"];

// Create connection
$conn = new mysqli($servername, 
    $username, $password, $dbname);
  
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " 
        . $conn->connect_error);
}
  
$sql = "INSERT INTO login_table VALUES 
    ('$id''$user', '$pass')";
  
if ($conn->query($sql) === TRUE) {
    //Redirect user back to login page
    header('Location: ../index.html');
    echo "record inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
?>