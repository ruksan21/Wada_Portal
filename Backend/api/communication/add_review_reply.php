<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->review_id) && 
    !empty($data->reply_text) &&
    !empty($data->officer_id)
) {
    $review_id = intval($data->review_id);
    $officer_id = intval($data->officer_id);
    $reply_text = $conn->real_escape_string($data->reply_text);
    
    $sql = "UPDATE reviews SET 
            reply_text = '$reply_text', 
            replied_at = CURRENT_TIMESTAMP,
            replied_by_officer_id = $officer_id 
            WHERE id = $review_id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Reply added successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error adding reply: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Incomplete data. Review ID and Reply Text required."]);
}

$conn->close();
?>
