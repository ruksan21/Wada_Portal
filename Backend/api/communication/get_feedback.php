<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Cache-Control: no-cache, must-revalidate");
header("Content-Type: application/json");
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once '../db_connect.php';

$work_id = isset($_GET['work_id']) ? intval($_GET['work_id']) : 0;

if ($work_id === 0) {
    echo json_encode(["success" => false, "message" => "Work ID is required."]);
    exit();
}

$current_user_id = isset($_GET['current_user_id']) ? intval($_GET['current_user_id']) : 0;

// 1. Ensure feedback_replies table exists
$check_replies = $conn->query("SHOW TABLES LIKE 'feedback_replies'");
if ($check_replies->num_rows === 0) {
    $conn->query("CREATE TABLE `feedback_replies` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `feedback_id` INT DEFAULT NULL,
        `review_id` INT DEFAULT NULL,
        `user_id` INT NOT NULL,
        `user_name` VARCHAR(255) NOT NULL,
        `reply_text` LONGTEXT NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        KEY `idx_feedback_id` (`feedback_id`),
        KEY `idx_review_id` (`review_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

// 2. Ensure feedback_reactions table exists
$check_reactions = $conn->query("SHOW TABLES LIKE 'feedback_reactions'");
if ($check_reactions->num_rows === 0) {
    $conn->query("CREATE TABLE `feedback_reactions` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `feedback_id` INT DEFAULT NULL,
        `review_id` INT DEFAULT NULL,
        `reply_id` INT DEFAULT NULL,
        `user_id` INT NOT NULL,
        `reaction_type` VARCHAR(20) DEFAULT 'like',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        KEY `idx_feedback_id` (`feedback_id`),
        KEY `idx_review_id` (`review_id`),
        KEY `idx_reply_id` (`reply_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

// 3. Ensure work_feedback table has required columns for legacy support
$columns_to_check = [
    'reply_text' => "LONGTEXT DEFAULT NULL",
    'replied_at' => "TIMESTAMP NULL DEFAULT NULL",
    'replied_by_officer_id' => "INT DEFAULT NULL"
];

foreach ($columns_to_check as $col => $definition) {
    $check_col = $conn->query("SHOW COLUMNS FROM `work_feedback` LIKE '$col'");
    if ($check_col->num_rows === 0) {
        $conn->query("ALTER TABLE `work_feedback` ADD COLUMN `$col` $definition");
    }
}

// Fetch comments with user details and reply count
$sql = "SELECT 
    wf.*,
    u.first_name, u.last_name, u.role as user_role,
    u.photo as user_photo,
    u.email as user_email,
    (SELECT COUNT(*) FROM feedback_reactions WHERE feedback_id = wf.id) as likes,
    (SELECT COUNT(*) FROM feedback_reactions WHERE feedback_id = wf.id AND reaction_type = 'dislike') as dislikes,
    (SELECT COUNT(*) FROM feedback_replies WHERE feedback_id = wf.id) as reply_count
    " . ($current_user_id > 0 ? ", (SELECT reaction_type FROM feedback_reactions WHERE feedback_id = wf.id AND user_id = $current_user_id LIMIT 1) as user_reaction" : ", NULL as user_reaction") . "
FROM `work_feedback` wf
LEFT JOIN users u ON wf.user_id = u.id
WHERE wf.work_id = ? 
ORDER BY wf.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $work_id);
if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
    exit();
}
$result = $stmt->get_result();

$comments = [];
$total_rating = 0;
$count = 0;

while ($row = $result->fetch_assoc()) {
    $full_name = 'Anonymous';
    if (!empty($row['first_name'])) {
        $full_name = $row['first_name'] . ' ' . $row['last_name'];
    } elseif (!empty($row['user_name'])) {
        $full_name = $row['user_name'];
    }
    
    $comments[] = [
        'id' => $row['id'],
        'work_id' => $row['work_id'],
        'user_id' => $row['user_id'],
        'user_role' => $row['user_role'] ?? 'guest',
        'user_name' => $full_name,
        'user_photo' => $row['user_photo'] ?: null,
        'user_email' => $row['user_email'],
        'rating' => (int)$row['rating'],
        'comment' => $row['comment'],
        'reply_count' => (int)$row['reply_count'],
        'likes' => (int)$row['likes'],
        'dislikes' => (int)$row['dislikes'],
        'user_reaction' => $row['user_reaction'] ?? null,
        'created_at' => $row['created_at'],
        // Legacy Support
        'reply_text' => $row['reply_text'] ?? null,
        'replied_by_officer_id' => $row['replied_by_officer_id'] ?? null,
        'replied_at' => $row['replied_at'] ?? null,
        'reaction_breakdown' => []
    ];

    // Fetch Reaction Breakdown
    $reaction_sql = "SELECT reaction_type, COUNT(*) as count FROM feedback_reactions WHERE feedback_id = " . $row['id'] . " GROUP BY reaction_type";
    $reaction_res = $conn->query($reaction_sql);
    if ($reaction_res && $reaction_res->num_rows > 0) {
        while ($r_row = $reaction_res->fetch_assoc()) {
            $comments[count($comments)-1]['reaction_breakdown'][$r_row['reaction_type']] = intval($r_row['count']);
        }
    }

    if ($row['rating'] > 0) {
        $total_rating += $row['rating'];
        $count++;
    }
}

$average_rating = ($count > 0) ? round($total_rating / $count, 1) : 0;

echo json_encode([
    "success" => true,
    "comments" => $comments,
    "average_rating" => $average_rating,
    "total_reviews" => $count
]);

$stmt->close();
$conn->close();
?>
