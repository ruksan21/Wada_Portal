<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../db_connect.php';

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "User ID required"]);
    exit();
}

$activities = [];

// 1. Fetch Complaints
$sqlComplaints = "SELECT 'complaint' as type, id, title as activity_title, '' as description, status, created_at FROM complaints WHERE user_id = ? ORDER BY created_at DESC LIMIT 5";
$stmt = $conn->prepare($sqlComplaints);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$res = $stmt->get_result();
while ($row = $res->fetch_assoc()) {
    $activities[] = $row;
}

// 2. Fetch Reviews
$sqlReviews = "SELECT 'review' as type, r.id, r.comment as description, 
               CONCAT('Ward ', w.ward_number, ' Chairperson\'s Office') as activity_title,
               r.rating, r.reply_text, r.replied_at, r.created_at 
               FROM reviews r 
               LEFT JOIN wards w ON r.ward_id = w.ward_id 
               WHERE r.user_id = ? 
               ORDER BY r.created_at DESC LIMIT 5";
$stmt = $conn->prepare($sqlReviews);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$res = $stmt->get_result();
while ($row = $res->fetch_assoc()) {
    $activities[] = $row;
}

// 3. Fetch Work Feedback (Comments)
$sqlWorkFeedback = "SELECT 'comment' as type, wf.id, wf.comment as description, 
                   works.title as activity_title,
                   wf.created_at 
                   FROM work_feedback wf 
                   LEFT JOIN works ON wf.work_id = works.id 
                   WHERE wf.user_id = ? 
                   ORDER BY wf.created_at DESC LIMIT 5";
$stmt = $conn->prepare($sqlWorkFeedback);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$res = $stmt->get_result();
while ($row = $res->fetch_assoc()) {
    $activities[] = $row;
}

// 4. Fetch Following (Optional, but let's see if we have followers table)
// For now, let's just stick to these 3.

// Sort all activities by created_at DESC
usort($activities, function($a, $b) {
    return strtotime($b['created_at']) - strtotime($a['created_at']);
});

// Limit to top 15
$activities = array_slice($activities, 0, 15);

echo json_encode(["success" => true, "data" => $activities]);

$conn->close();
?>
