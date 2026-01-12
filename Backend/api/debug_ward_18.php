<?php
require_once 'db_connect.php';
header("Content-Type: text/plain");

$res = $conn->query("SELECT id, province, district, municipality, ward_number FROM wards WHERE id = 18");
if ($res && $row = $res->fetch_assoc()) {
    print_r($row);
} else {
    echo "Ward with ID 18 not found or error: " . $conn->error;
}
?>
