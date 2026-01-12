<?php
// Prevent any output before JSON
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../db_connect.php';

// Clear any output that might have occurred
ob_clean();

try {
    // Get query parameters
    $type = isset($_GET['type']) ? $_GET['type'] : 'all';
    $status = isset($_GET['status']) ? $_GET['status'] : 'all';
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;
    
    // Build query using UNION to include system_alerts
    $query = "(SELECT n.id, n.user_id, n.ward_id, n.title, n.message, n.type, 
                     n.source_province, n.source_district, n.source_municipality, n.source_ward, 
                     n.is_read, n.created_at,
                     CONCAT(IFNULL(u.first_name,''), ' ', IFNULL(u.last_name,'')) as user_name,
                     w.municipality, w.ward_number,
                     'notification' as origin
              FROM notifications n
              LEFT JOIN users u ON n.user_id = u.id
              LEFT JOIN wards w ON n.ward_id = w.id
              WHERE 1=1";
    
    if ($type !== 'all') {
        $query .= " AND n.type = '$type'"; // Simple concatenation for UNION compatibility with bind_param being tricky
    }
    
    if ($status === 'read') {
        $query .= " AND n.is_read = 1";
    } elseif ($status === 'unread') {
        $query .= " AND n.is_read = 0";
    }
    
    $query .= ") UNION ALL 
              (SELECT sa.id, sa.user_id, sa.ward_id, sa.title, sa.message, sa.type,
                     NULL as source_province, NULL as source_district, w.municipality as source_municipality, w.ward_number as source_ward,
                     (CASE WHEN sa.status = 'unread' THEN 0 ELSE 1 END) as is_read, sa.created_at,
                     NULL as user_name,
                     w.municipality, w.ward_number,
                     'system_alert' as origin
              FROM system_alerts sa
              LEFT JOIN wards w ON sa.ward_id = w.id
              WHERE 1=1";

    if ($type !== 'all') {
        $query .= " AND sa.type = '$type'";
    }

    if ($status === 'read') {
        $query .= " AND sa.status = 'read'";
    } elseif ($status === 'unread') {
        $query .= " AND sa.status = 'unread'";
    }

    $query .= ") ORDER BY created_at DESC LIMIT $limit";
    
    $result = $conn->query($query);
    
    $notifications = [];
    if($result) {
        while ($row = $result->fetch_assoc()) {
            $notifications[] = $row;
        }
    }
    
    ob_clean();
    echo json_encode([
        "success" => true,
        "notifications" => $notifications,
        "total" => count($notifications)
    ]);
    
} catch (Exception $e) {
    ob_clean();
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}

$conn->close();
ob_end_flush();
?>
