<?php
require_once 'Backend/db_connect.php';

echo "=== WARDS TABLE ===\n";
$result = $conn->query("SELECT id, province, district, municipality, ward_number FROM wards");
while ($row = $result->fetch_assoc()) {
    echo "ID: " . $row['id'] . " | " . 
         "Prov: '" . $row['province'] . "' | " . 
         "Dist: '" . $row['district'] . "' | " . 
         "Muni: '" . $row['municipality'] . "' | " . 
         "Ward: " . $row['ward_number'] . "\n";
}

echo "\n=== OFFICERS ===\n";
$result = $conn->query("SELECT id, first_name, work_province, work_district, work_municipality, work_ward, assigned_ward_id FROM users WHERE role='officer'");
while ($row = $result->fetch_assoc()) {
    echo "ID: " . $row['id'] . " | " . 
         "Name: " . $row['first_name'] . " | " . 
         "WorkMuni: '" . $row['work_municipality'] . "' | " . 
         "WorkWard: " . $row['work_ward'] . " | " . 
         "AssignedWardID: " . ($row['assigned_ward_id'] ? $row['assigned_ward_id'] : 'NULL') . "\n";
}
?>
