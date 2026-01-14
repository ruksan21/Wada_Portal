<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

// Capture errors and return as JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "PHP Error: $errstr",
        "file" => basename($errfile),
        "line" => $errline
    ]);
    exit();
});

require_once '../db_connect.php';

$ward_id = isset($_GET['ward_id']) ? intval($_GET['ward_id']) : 0;

if ($ward_id > 0) {
    $sql = "SELECT 
                r.id, 
                r.rating, 
                r.comment, 
                r.created_at, 
                u.first_name, 
                u.middle_name,
                u.last_name,
                u.photo,
                u.role,
                u.province,
                u.district,
                u.city
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.ward_id = ?
            ORDER BY r.created_at DESC";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode([
            "success" => false,
            "message" => "SQL prepare failed: " . $conn->error
        ]);
        exit();
    }
    
    $stmt->bind_param("i", $ward_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $reviews = [];
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Ensure photo is null if empty for frontend checks
            $row['photo'] = !empty($row['photo']) ? $row['photo'] : null;
            $reviews[] = $row;
        }
    }
    
    // Calculate average
    $avgSql = "SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews FROM reviews WHERE ward_id = ?";
    $avgStmt = $conn->prepare($avgSql);
    $avgStmt->bind_param("i", $ward_id);
    $avgStmt->execute();
    $avgResult = $avgStmt->get_result();
    $stats = $avgResult->fetch_assoc();
    
    echo json_encode([
        "success" => true, 
        "data" => $reviews,
        "stats" => [
            "rating" => $stats['avg_rating'] ? round($stats['avg_rating'], 1) : 0,
            "count" => $stats['total_reviews'] ?? 0
        ]
    ]);
    
    $stmt->close();
    $avgStmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Ward ID required"]);
}

$conn->close();
?>
