<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->review_id)) {
    echo json_encode(["success" => false, "message" => "Review ID is required"]);
    exit();
}

$review_id = intval($data->review_id);
$user_id = isset($data->user_id) ? intval($data->user_id) : 0;

if ($user_id === 0) {
    echo json_encode(["success" => false, "message" => "User ID required for authorization"]);
    exit();
}

// Check authorization: Owner or Officer
$check_sql = "SELECT user_id, (SELECT role FROM users WHERE id = ?) as requester_role FROM reviews WHERE id = ?";
$stmt_check = $conn->prepare($check_sql);
$stmt_check->bind_param("ii", $user_id, $review_id);
$stmt_check->execute();
$res = $stmt_check->get_result();

if ($row = $res->fetch_assoc()) {
    if ($row['user_id'] != $user_id && $row['requester_role'] !== 'officer' && $row['requester_role'] !== 'admin') {
        echo json_encode(["success" => false, "message" => "Unauthorized to delete this review"]);
        exit();
    }
} else {
    echo json_encode(["success" => false, "message" => "Review not found"]);
    exit();
}

// Start transaction to delete related data as well
$conn->begin_transaction();

try {
    // 1. Delete feedback_replies (if any)
    $stmt1 = $conn->prepare("DELETE FROM feedback_replies WHERE review_id = ?");
    $stmt1->bind_param("i", $review_id);
    $stmt1->execute();
    $stmt1->close();

    // 2. Delete feedback_votes (if any)
    $stmt2 = $conn->prepare("DELETE FROM feedback_votes WHERE review_id = ?");
    $stmt2->bind_param("i", $review_id);
    $stmt2->execute();
    $stmt2->close();

    // 3. Delete the review itself
    $stmt3 = $conn->prepare("DELETE FROM reviews WHERE id = ?");
    $stmt3->bind_param("i", $review_id);
    $stmt3->execute();

    if ($stmt3->affected_rows > 0) {
        $conn->commit();
        echo json_encode(["success" => true, "message" => "Review deleted successfully"]);
    } else {
        $conn->rollback();
        echo json_encode(["success" => false, "message" => "Delete failed"]);
    }
    $stmt3->close();

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}

$conn->close();
?>
