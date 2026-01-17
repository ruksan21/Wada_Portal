<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);
$feedback_id = isset($data['feedback_id']) ? intval($data['feedback_id']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;
$comment = isset($data['comment']) ? $conn->real_escape_string($data['comment']) : '';

if ($feedback_id === 0 || $user_id === 0 || empty($comment)) {
    echo json_encode(["success" => false, "message" => "ID and comment are required."]);
    exit();
}

// Check authorization: Owner ONLY for editing
$check_sql = "SELECT user_id FROM work_feedback WHERE id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("i", $feedback_id);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    if ($row['user_id'] == $user_id) {
        // Authorized to edit
        $upd = $conn->prepare("UPDATE work_feedback SET comment = ? WHERE id = ?");
        $upd->bind_param("si", $comment, $feedback_id);
        if ($upd->execute()) {
            echo json_encode(["success" => true, "message" => "Comment updated."]);
        } else {
            echo json_encode(["success" => false, "message" => "Update failed."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Unauthorized to edit this comment."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Feedback not found."]);
}

$conn->close();
?>
