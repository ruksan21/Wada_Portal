<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);
$reply_id = isset($data['reply_id']) ? intval($data['reply_id']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;

if ($reply_id === 0 || $user_id === 0) {
    echo json_encode(["success" => false, "message" => "ID is required."]);
    exit();
}

// Check authorization: Owner or Officer
$check_sql = "SELECT user_id, (SELECT role FROM users WHERE id = ?) as requester_role FROM feedback_replies WHERE id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("ii", $user_id, $reply_id);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    if ($row['user_id'] == $user_id || $row['requester_role'] === 'officer') {
        // Authorized
        $del = $conn->prepare("DELETE FROM feedback_replies WHERE id = ?");
        $del->bind_param("i", $reply_id);
        if ($del->execute()) {
             // Delete reactions to this reply
            $conn->query("DELETE FROM feedback_reactions WHERE reply_id = $reply_id");
            echo json_encode(["success" => true, "message" => "Reply deleted."]);
        } else {
            echo json_encode(["success" => false, "message" => "Delete failed."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Unauthorized."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Reply not found."]);
}

$conn->close();
?>
