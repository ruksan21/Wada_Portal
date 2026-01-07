<?php
header("Content-Type: application/json");
require_once '../db_connect.php';

$response = [];

// 1. Get all wards
$wards = [];
$result = $conn->query("SELECT id, province, district, municipality, ward_number FROM wards");
if ($result) {
    while($row = $result->fetch_assoc()) {
        $wards[] = $row;
    }
}
$response['wards'] = $wards;

// 2. Get all officers
$officers = [];
$result = $conn->query("SELECT id, first_name, work_province, work_district, work_municipality, work_ward, assigned_ward_id FROM users WHERE role='officer'");
if ($result) {
    while($row = $result->fetch_assoc()) {
        $officers[] = $row;
    }
}
$response['officers'] = $officers;

echo json_encode($response, JSON_PRETTY_PRINT);
?>
