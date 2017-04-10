<?php
$servername = "localhost";
$username = "****ID";
$password = "****PW";
$database = "****DB";
parse_str($_SERVER['QUERY_STRING'], $get);
print_r($get);

$songname=$get["name"];
$songalbum=$get["album"];
$songartist=$get["artist"];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO musicrecommand VALUES (null,'".$songname."','" .$songalbum."','" .$songartist."');";
    // 使用 exec() ，没有结果返回 
    $conn->exec($sql);
    echo "新记录插入成功";
    } catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
?>