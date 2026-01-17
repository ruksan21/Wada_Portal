<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);
$feedback_id = isset($data['feedback_id']) ? intval($data['feedback_id']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;

if ($feedback_id === 0 || $user_id === 0) {
    echo json_encode(["success" => false, "message" => "ID is required."]);
    exit();
}

// Check authorization: Owner or Officer
$check_sql = "SELECT user_id, (SELECT role FROM users WHERE id = ?) as requester_role FROM work_feedback WHERE id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("ii", $user_id, $feedback_id);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    if ($row['user_id'] == $user_id || $row['requester_role'] === 'officer') {
        // Authorized
        $del = $conn->prepare("DELETE FROM work_feedback WHERE id = ?");
        $del->bind_param("i", $feedback_id);
        if ($del->execute()) {
            // Also delete reactions and replies to this feedback?
            // Usually DB has cascade or we do it manually.
            $conn->query("DELETE FROM feedback_reactions WHERE feedback_id = $feedback_id");
            $conn->query("DELETE FROM feedback_replies WHERE feedback_id = $feedback_id");
            
            echo json_encode(["success" => true, "message" => "Comment deleted."]);
        } else {
            echo json_encode(["success" => false, "message" => "Delete failed."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Unauthorized."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Feedback not found."]);
}

$conn->close();
?>
