<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);
$reply_id = isset($data['reply_id']) ? intval($data['reply_id']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;
$reply_text = isset($data['reply_text']) ? $conn->real_escape_string($data['reply_text']) : '';

if ($reply_id === 0 || $user_id === 0 || empty($reply_text)) {
    echo json_encode(["success" => false, "message" => "ID and text are required."]);
    exit();
}

// Check authorization: Owner ONLY for editing
$check_sql = "SELECT user_id FROM feedback_replies WHERE id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("i", $reply_id);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    if ($row['user_id'] == $user_id) {
        // Authorized to edit
        $upd = $conn->prepare("UPDATE feedback_replies SET reply_text = ? WHERE id = ?");
        $upd->bind_param("si", $reply_text, $reply_id);
        if ($upd->execute()) {
            echo json_encode(["success" => true, "message" => "Reply updated."]);
        } else {
            echo json_encode(["success" => false, "message" => "Update failed."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Unauthorized to edit this reply."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Reply not found."]);
}

$conn->close();
?>
