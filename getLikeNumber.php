<?php
$servername = "localhost";
$username = "****ID";
$password = "****PW";
$database = "****DB";
parse_str($_SERVER['QUERY_STRING'], $get);

header("Access-Control-Allow-Origin: *");

$articlename=$get["articlename"];
$reIP=$_SERVER["REMOTE_ADDR"]; 

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT COUNT(articlename) FROM articlelike WHERE articlename='" .$articlename."';";
    $sql2 = "SELECT COUNT(ip) FROM articlelike WHERE ip='" .$reIP."' and articlename='" .$articlename."';";
    $sth = $conn->query($sql);
    $sth2 = $conn->query($sql2);
    while($row = $sth->fetch()){
    echo$row['COUNT(articlename)']."<br>";
}
while($row = $sth2->fetch()){
    echo$row['COUNT(ip)'];
}
    } catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
?>