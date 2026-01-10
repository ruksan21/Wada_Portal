<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db_connect.php';
require_once '../utils/ward_utils.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->title) && !empty($data->officer_id)) {
    
    // 1. Resolve Ward ID using shared utils
    $ward_id = !empty($data->ward_id)
        ? intval($data->ward_id)
        : getOfficerWardIdOrError($conn, intval($data->officer_id), true);

    // Prepare data
    $title = $conn->real_escape_string($data->title);
    $subtitle = isset($data->subtitle) ? $conn->real_escape_string($data->subtitle) : '';
    $description = isset($data->description) ? $conn->real_escape_string($data->description) : '';
    $activity_date = isset($data->activity_date) ? $data->activity_date : date('Y-m-d');
    $activity_time = isset($data->activity_time) ? $data->activity_time : date('H:i');
    $icon = isset($data->icon) ? $conn->real_escape_string($data->icon) : '📅';
    $icon_bg = isset($data->icon_bg) ? $conn->real_escape_string($data->icon_bg) : '#E8F5E9';

    // Check if this is an UPDATE (id provided)
    if (!empty($data->id)) {
        $activity_id = intval($data->id);
        
        $sql = "UPDATE ward_activities SET 
                    title = ?, 
                    subtitle = ?, 
                    description = ?, 
                    activity_date = ?, 
                    activity_time = ?, 
                    icon = ?, 
                    icon_bg = ?
                WHERE id = ? AND ward_id = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssii", $title, $subtitle, $description, $activity_date, $activity_time, $icon, $icon_bg, $activity_id, $ward_id);
        
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["success" => true, "message" => "Activity updated successfully.", "id" => $activity_id]);
            } else {
                echo json_encode(["success" => false, "message" => "No changes made or activity not found."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Error updating activity: " . $stmt->error]);
        }
    } else {
        // 2. Insert Activity
        $sql = "INSERT INTO ward_activities (ward_id, title, subtitle, description, activity_date, activity_time, icon, icon_bg)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssssss", $ward_id, $title, $subtitle, $description, $activity_date, $activity_time, $icon, $icon_bg);
        
        if ($stmt->execute()) {
            $activity_id = $stmt->insert_id;

            // 3. Create Notifications (System Alerts)
            // User Notification
            $msg_user = "New Activity: $title - $subtitle";
            $type = 'info';
            $status = 'unread';
            
            // Notify Users
            $sql_alert_user = "INSERT INTO system_alerts (ward_id, type, title, message, status, target_role) VALUES (?, ?, ?, ?, ?, 'user')";
            $stmt_u = $conn->prepare($sql_alert_user);
            $alert_title = "New Activity";
            $stmt_u->bind_param("issss", $ward_id, $type, $alert_title, $msg_user, $status);
            $stmt_u->execute();

            // Notify Officers
            $sql_alert_officer = "INSERT INTO system_alerts (ward_id, type, title, message, status, target_role) VALUES (?, ?, ?, ?, ?, 'officer')";
            $stmt_o = $conn->prepare($sql_alert_officer);
            $stmt_o->bind_param("issss", $ward_id, $type, $alert_title, $msg_user, $status);
            $stmt_o->execute();

            // Also add to notifications table for ward feed
            $notif_title = "📅 Work Activity";
            $notif_msg = "New activity added: " . $title;
            $notif_sql = "INSERT INTO notifications (ward_id, title, message, type, is_read, created_at) VALUES (?, ?, ?, 'activity', 0, NOW())";
            if ($notif_stmt = $conn->prepare($notif_sql)) {
                $notif_stmt->bind_param("iss", $ward_id, $notif_title, $notif_msg);
                $notif_stmt->execute();
                $notif_stmt->close();
            }

            echo json_encode(["success" => true, "message" => "Activity added and notifications sent.", "id" => $activity_id]);
        } else {
            echo json_encode(["success" => false, "message" => "Error adding activity: " . $stmt->error]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "Incomplete data."]);
}
?>
