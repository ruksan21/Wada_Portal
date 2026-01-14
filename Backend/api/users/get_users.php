<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    require_once '../db_connect.php';

    // Check if a specific ID is requested
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $stmt = $conn->prepare("SELECT id, first_name, middle_name, last_name, email, contact_number, role, status, 
              ward_number, officer_id, department, work_province, work_district, work_municipality, work_ward, work_office_location, gender, dob, 
              province, district, city, citizenship_number, created_at, photo 
              FROM users WHERE id = ?");
        
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        // Fetch all users ordered by creation date (id)
        $query = "SELECT id, first_name, middle_name, last_name, email, contact_number, role, status, 
              ward_number, officer_id, department, work_province, work_district, work_municipality, work_ward, work_office_location, gender, dob, 
              province, district, city, citizenship_number, created_at, photo 
              FROM users 
              ORDER BY id DESC";
        $result = $conn->query($query);
        
        if (!$result) {
            throw new Exception("Query failed: " . $conn->error);
        }
    }

    if ($result) {
        $users = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(array("success" => true, "data" => $users));
    } else {
        echo json_encode(array("success" => false, "message" => "No results found"));
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        "success" => false, 
        "message" => "Server Error: " . $e->getMessage()
    ));
}
?>
