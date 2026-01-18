<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);
$review_id = isset($data['review_id']) ? intval($data['review_id']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;
$comment = isset($data['comment']) ? $conn->real_escape_string($data['comment']) : '';

if ($review_id === 0 || $user_id === 0 || empty($comment)) {
    echo json_encode(["success" => false, "message" => "ID and comment are required."]);
    exit();
}

// Check authorization: Owner ONLY for editing
$check_sql = "SELECT user_id FROM reviews WHERE id = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("i", $review_id);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    if ($row['user_id'] == $user_id) {
        // Authorized to edit
        $upd = $conn->prepare("UPDATE reviews SET comment = ? WHERE id = ?");
        $upd->bind_param("si", $comment, $review_id);
        if ($upd->execute()) {
            echo json_encode(["success" => true, "message" => "Review updated."]);
        } else {
            echo json_encode(["success" => false, "message" => "Update failed."]);
        }
        $upd->close();
    } else {
        echo json_encode(["success" => false, "message" => "Unauthorized to edit this review."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Review not found."]);
}

$stmt->close();
$conn->close();
?>
