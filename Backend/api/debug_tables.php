<?php
require_once 'db_connect.php';

echo "Table: notifications\n";
$res = $conn->query("DESC notifications");
while($row = $res->fetch_assoc()) {
    print_r($row);
}

echo "\nTable: system_alerts\n";
$res = $conn->query("DESC system_alerts");
while($row = $res->fetch_assoc()) {
    print_r($row);
}
?>
