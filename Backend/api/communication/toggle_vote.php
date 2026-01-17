<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$feedback_id = isset($data['feedback_id']) ? intval($data['feedback_id']) : 0;
$review_id = isset($data['review_id']) ? intval($data['review_id']) : 0;
$reply_id = isset($data['reply_id']) ? intval($data['reply_id']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;
$reaction_type = isset($data['reaction_type']) ? $conn->real_escape_string($data['reaction_type']) : 'like'; 
// Expected values: 'like', 'love', 'haha', 'wow', 'sad', 'angry'

// Auto-repair/Update schema if needed
$check_col = $conn->query("SHOW COLUMNS FROM feedback_reactions LIKE 'reaction_type'");
if ($check_col && $check_col->num_rows == 0) {
    $conn->query("ALTER TABLE feedback_reactions ADD COLUMN reaction_type VARCHAR(20) NOT NULL DEFAULT 'like'");
}

if (($feedback_id === 0 && $review_id === 0 && $reply_id === 0) || $user_id === 0) {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
    exit();
}

// Determine target
if ($reply_id > 0) {
    $target_col = "reply_id";
    $target_id = $reply_id;
    // Check table name - assuming feedback_reactions supports reply_id
    $table = "feedback_reactions";
} else if ($review_id > 0) {
    // Legacy support or if reviews use same table
    $target_col = "review_id";
    $target_id = $review_id;
    $table = "feedback_reactions"; 
} else {
    $target_col = "feedback_id";
    $target_id = $feedback_id;
    $table = "feedback_reactions";
}

// Check existing reaction
$stmt = $conn->prepare("SELECT id, reaction_type FROM $table WHERE user_id = ? AND $target_col = ?");
$stmt->bind_param("ii", $user_id, $target_id);
$stmt->execute();
$result = $stmt->get_result();

$action = '';

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['reaction_type'] === $reaction_type) {
        // Same reaction: Remove it (Toggle off)
        $del = $conn->prepare("DELETE FROM $table WHERE id = ?");
        $del->bind_param("i", $row['id']);
        $del->execute();
        $action = 'removed';
        $user_reaction = null;
    } else {
        // Different reaction: Update it
        $upd = $conn->prepare("UPDATE $table SET reaction_type = ? WHERE id = ?");
        $upd->bind_param("si", $reaction_type, $row['id']);
        $upd->execute();
        $action = 'updated';
        $user_reaction = $reaction_type;
    }
} else {
    // New reaction
    $ins = $conn->prepare("INSERT INTO $table ($target_col, user_id, reaction_type) VALUES (?, ?, ?)");
    $ins->bind_param("iis", $target_id, $user_id, $reaction_type);
    $ins->execute();
    $action = 'added';
    $user_reaction = $reaction_type;
}

// Get updated counts
// Total likes (considering 'like' and 'love' as positive if needed, or just raw count)
// For now, let's return total reactions count
$count_stmt = $conn->prepare("SELECT COUNT(*) as total FROM $table WHERE $target_col = ?");
$count_stmt->bind_param("i", $target_id);
$count_stmt->execute();
$total_reactions = $count_stmt->get_result()->fetch_assoc()['total'];

// We could return breakdown like:
// SELECT reaction_type, COUNT(*) FROM feedback_reactions GROUP BY reaction_type
// But for simplicity just total for now.

// Get updated breakdown
$bd_sql = "SELECT reaction_type, COUNT(*) as count FROM feedback_reactions WHERE $target_col = $target_id GROUP BY reaction_type";
$bd_res = $conn->query($bd_sql);
$reaction_breakdown = [];
if ($bd_res && $bd_res->num_rows > 0) {
    while ($r_row = $bd_res->fetch_assoc()) {
        $reaction_breakdown[$r_row['reaction_type']] = intval($r_row['count']);
    }
}

echo json_encode([
    "success" => true,
    "action" => $action,
    "likes" => $total_reactions, // Mapping to 'likes' prop for frontend compat
    "user_reaction" => $user_reaction,
    "reaction_breakdown" => $reaction_breakdown
]);

$conn->close();
?>
