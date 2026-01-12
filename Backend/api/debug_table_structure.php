<?php
require_once 'db_connect.php';
header("Content-Type: text/plain");

$tables = ['complaints', 'users'];

foreach ($tables as $table) {
    echo "--- Table: $table ---\n";
    $res = $conn->query("DESC $table");
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            echo "Field: {$row['Field']} | Type: {$row['Type']} | Null: {$row['Null']} | Key: {$row['Key']} | Default: {$row['Default']} | Extra: {$row['Extra']}\n";
        }
    } else {
        echo "Error describing $table: " . $conn->error . "\n";
    }
    echo "\n";
}
?>
