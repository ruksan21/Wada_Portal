<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../db_connect.php';

// Fetch complaints (filter by ward and source if provided)
$ward_id = isset($_GET['ward_id']) ? intval($_GET['ward_id']) : null;
$source_role = isset($_GET['source']) ? $_GET['source'] : null; // 'citizen' or 'officer'

$sql = "SELECT c.*, u.role as user_role 
        FROM complaints c 
        LEFT JOIN users u ON c.complainant_user_id = u.id 
        WHERE 1=1";

if ($ward_id) {
    $sql .= " AND c.ward_id = $ward_id";
}

if ($source_role === 'officer') {
    // Complaints MADE BY officers (for Admin to see)
    // Assuming officers have role='officer' in users table
    $sql .= " AND u.role = 'officer'";
} elseif ($source_role === 'citizen') {
    // Complaints MADE BY citizens (for Officer to see)
    // Either user is null (guest) or role is citizen
    $sql .= " AND (u.role = 'citizen' OR u.role IS NULL)";
}

$sql .= " ORDER BY c.created_at DESC";

$result = $conn->query($sql);

$complaints = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $complaints[] = $row;
    }
}

echo json_encode($complaints);

$conn->close();
?>
