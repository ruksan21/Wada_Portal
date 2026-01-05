<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->ward) || 
    !isset($data->fullName) || 
    !isset($data->subject) || 
    !isset($data->message)
) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data."]);
    exit();
}

$ward_number = intval($data->ward);
// Resolve Ward ID
$ward_id = $ward_number; // Default callback
$w_query = $conn->query("SELECT id FROM wards WHERE ward_number = $ward_number LIMIT 1");
if ($w_query && $w_query->num_rows > 0) {
    $ward_id = $w_query->fetch_assoc()['id'];
}

$municipality = $data->municipality ?? '';
$full_name = $data->fullName;
$email = $data->email ?? '';
$phone = $data->phone ?? '';
$subject = $data->subject;
$message = $data->message;
$priority = $data->priority ?? 'Medium';
$user_id = isset($data->userId) ? intval($data->userId) : "NULL";

// Insert into complaints table
$query = "INSERT INTO complaints (ward_id, complainant_user_id, complainant, subject, message, priority, status, created_at) 
          VALUES (?, ?, ?, ?, ?, ?, 'Open', NOW())";

$stmt = $conn->prepare($query);

// Bind parameters. Note: user_id is integer or NULL, but binding "NULL" string in SQL requires care.
// Better way for nullable integer:
if ($user_id === "NULL") {
    $stmt = $conn->prepare("INSERT INTO complaints (ward_id, complainant, subject, message, priority, status, created_at) VALUES (?, ?, ?, ?, ?, 'Open', NOW())");
    $stmt->bind_param("issss", $ward_id, $full_name, $subject, $message, $priority);
} else {
    $stmt->bind_param("iissss", $ward_id, $user_id, $full_name, $subject, $message, $priority);
}

if ($stmt->execute()) {
    $complaint_id = $conn->insert_id;

    // Create a System Alert for the Ward Officer
    $alert_title = "New Complaint: " . $subject;
    $alert_message = "A new complaint has been received from " . $full_name . " (" . $priority . " Priority).";
    
    // Insert into system_alerts linked to the ward
    $alert_query = "INSERT INTO system_alerts (ward_id, type, title, message, status, created_at) 
                    VALUES (?, 'warning', ?, ?, 'unread', NOW())";
    
    $alert_stmt = $conn->prepare($alert_query);
    $alert_stmt->bind_param("iss", $ward_id, $alert_title, $alert_message);
    $alert_stmt->execute();

    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Complaint submitted successfully.", "id" => $complaint_id]);
} else {
    http_response_code(503);
    echo json_encode(["success" => false, "message" => "Unable to submit complaint."]);
}

$conn->close();
?>
