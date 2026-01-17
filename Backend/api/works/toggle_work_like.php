<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$work_id = isset($data['work_id']) ? intval($data['work_id']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;
$reaction_type = isset($data['reaction_type']) ? $conn->real_escape_string($data['reaction_type']) : 'like';

// Auto-repair/Update schema if needed
$check_col = $conn->query("SHOW COLUMNS FROM work_likes LIKE 'reaction_type'");
if ($check_col && $check_col->num_rows == 0) {
    $conn->query("ALTER TABLE work_likes ADD COLUMN reaction_type VARCHAR(20) DEFAULT 'like'");
}

if ($work_id === 0 || $user_id === 0) {
    echo json_encode(["success" => false, "message" => "Invalid work or user ID."]);
    exit();
}

// Check if already reacted
$stmt = $conn->prepare("SELECT id, reaction_type FROM work_likes WHERE work_id = ? AND user_id = ?");
$stmt->bind_param("ii", $work_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

$liked = false;
$user_reaction = null;

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    if ($row['reaction_type'] === $reaction_type) {
        // Same reaction: toggle off (remove)
        $del = $conn->prepare("DELETE FROM work_likes WHERE id = ?");
        $del->bind_param("i", $row['id']);
        $del->execute();
        $liked = false;
        $user_reaction = null;
    } else {
        // Different reaction: update
        $upd = $conn->prepare("UPDATE work_likes SET reaction_type = ? WHERE id = ?");
        $upd->bind_param("si", $reaction_type, $row['id']);
        $upd->execute();
        $liked = true;
        $user_reaction = $reaction_type;
    }
} else {
    // New reaction
    $ins = $conn->prepare("INSERT INTO work_likes (work_id, user_id, reaction_type) VALUES (?, ?, ?)");
    $ins->bind_param("iis", $work_id, $user_id, $reaction_type);
    $ins->execute();
    $liked = true;
    $user_reaction = $reaction_type;
}

// Get updated count
$count_stmt = $conn->prepare("SELECT COUNT(*) as total FROM work_likes WHERE work_id = ?");
$count_stmt->bind_param("i", $work_id);
$count_stmt->execute();
$count_res = $count_stmt->get_result();
$count_data = $count_res->fetch_assoc();

// Get reaction breakdown
$bd_sql = "SELECT reaction_type, COUNT(*) as count FROM work_likes WHERE work_id = $work_id GROUP BY reaction_type";
$bd_res = $conn->query($bd_sql);
$reaction_breakdown = [];
if ($bd_res && $bd_res->num_rows > 0) {
    while($r_row = $bd_res->fetch_assoc()) {
        $reaction_breakdown[$r_row['reaction_type']] = intval($r_row['count']);
    }
}

echo json_encode([
    "success" => true,
    "liked" => $liked, // boolean for frontend compat
    "likes" => intval($count_data['total']),
    "user_reaction" => $user_reaction,
    "reaction_breakdown" => $reaction_breakdown
]);

$conn->close();
?>
