<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../db_connect.php';

// Get parameters from GET or POST
$province = isset($_GET['province']) ? $conn->real_escape_string($_GET['province']) : (isset($_POST['province']) ? $conn->real_escape_string($_POST['province']) : '');
$district = isset($_GET['district']) ? $conn->real_escape_string($_GET['district']) : (isset($_POST['district']) ? $conn->real_escape_string($_POST['district']) : '');
$municipality = isset($_GET['municipality']) ? $conn->real_escape_string($_GET['municipality']) : (isset($_POST['municipality']) ? $conn->real_escape_string($_POST['municipality']) : '');
$ward_number = isset($_GET['ward_number']) ? intval($_GET['ward_number']) : (isset($_POST['ward_number']) ? intval($_POST['ward_number']) : 0);

if (!$province || !$district || !$municipality || !$ward_number) {
    echo json_encode([
        "success" => false,
        "message" => "All parameters (province, district, municipality, ward_number) are required"
    ]);
    exit();
}

// Check if ward exists with flexible fuzzy matching
$province_safe = $conn->real_escape_string($province);
$district_safe = $conn->real_escape_string($district);
$municipality_safe = $conn->real_escape_string($municipality);

// Logic:
// 1. Ward Number must match exactly
// 2. District usually matches exactly (but we'll allow case-insensitive)
// 3. Province and Municipality might have variations (e.g. "Koshi" vs "Koshi Province", "Itahari" vs "Itahari Sub-Metropolitan City")
// We use bidirectional LIKE: input contains DB_val OR DB_val contains input

$query = "SELECT id, ward_number, municipality, district, province 
          FROM wards 
          WHERE ward_number = $ward_number
          AND (
              TRIM(province) LIKE TRIM('$province_safe') 
              OR TRIM(province) LIKE CONCAT('%', TRIM('$province_safe'), '%')
              OR '$province_safe' LIKE CONCAT('%', TRIM(province), '%')
          )
          AND (
              TRIM(district) LIKE TRIM('$district_safe')
              OR TRIM(district) LIKE CONCAT('%', TRIM('$district_safe'), '%')
              OR '$district_safe' LIKE CONCAT('%', TRIM(district), '%')
          )
          AND (
              TRIM(municipality) LIKE TRIM('$municipality_safe')
              OR TRIM(municipality) LIKE CONCAT('%', TRIM('$municipality_safe'), '%')
              OR '$municipality_safe' LIKE CONCAT('%', TRIM(municipality), '%')
          )
          LIMIT 1";

$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $ward = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "exists" => true,
        "ward_id" => $ward['id'],
        "ward" => $ward
    ]);
} else {
    // Debug info to help diagnose
    $debug_query = "SELECT * FROM wards WHERE ward_number = $ward_number";
    $debug_res = $conn->query($debug_query);
    $similar_wards = [];
    while($row = $debug_res->fetch_assoc()) {
        $similar_wards[] = $row;
    }

    echo json_encode([
        "success" => true,
        "exists" => false,
        "message" => "Ward $ward_number in $municipality, $district not found.",
        "debug_info" => [
            "searched_for" => [
                "province" => $province,
                "district" => $district, 
                "municipality" => $municipality, 
                "ward" => $ward_number
            ],
            "query_used" => $query,
            "candidates_with_same_ward_number" => $similar_wards
        ]
    ]);
}

$conn->close();
?>
