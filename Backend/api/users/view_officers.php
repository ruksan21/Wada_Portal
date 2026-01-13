<?php
require_once '../db_connect.php';
$res = $conn->query("SELECT id, username, role, work_province, work_district, work_municipality, work_ward FROM users WHERE role = 'officer'");
echo "<pre>";
while($r = $res->fetch_assoc()) print_r($r);
echo "</pre>";
?>
