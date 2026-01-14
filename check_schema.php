<?php
require_once 'Backend/api/db_connect.php';
$result = $conn->query("DESCRIBE reviews");
while($row = $result->fetch_assoc()) {
    print_r($row);
}
?>
