<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    require_once '../../db_connect.php';

    // Get all complaints with user info
    $query = "SELECT c.*, u.full_name, u.gmail, u.role 
              FROM complaints c 
              JOIN users u ON c.user_id = u.id 
              ORDER BY c.created_at DESC";

    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $complaints = [];
    while ($row = $result->fetch_assoc()) {
        $complaints[] = $row;
    }

    echo json_encode(['success' => true, 'complaints' => $complaints]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server Error: ' . $e->getMessage()]);
}

$conn->close();
?>
