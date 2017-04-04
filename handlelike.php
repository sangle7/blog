<?php
$servername = "localhost";
$username = "id1242871_sangle";
$password = "362101";
$database = "id1242871_musiclist";
parse_str($_SERVER['QUERY_STRING'], $get);
print_r($get);

header("Access-Control-Allow-Origin: *");

$articlename=$get["articlename"];
$reIP=$_SERVER["REMOTE_ADDR"]; 

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO articlelike VALUES (null,'".$articlename."','" .$reIP."');";
    // 使用 exec() ，没有结果返回 
    $conn->exec($sql);
    echo "新记录插入成功";
    } catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
?>