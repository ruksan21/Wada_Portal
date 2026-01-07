<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->status)) {
    $id = intval($data->id);
    $status = $conn->real_escape_string($data->status); // 'active' for approve, 'rejected' for reject

    // If approving an officer, verify their work ward exists
    if ($status === 'active') {
        // Get officer's work location
        $officer_query = "SELECT work_province, work_district, work_municipality, work_ward 
                         FROM users 
                         WHERE id = $id AND role = 'officer'";
        $officer_result = $conn->query($officer_query);
        
        if ($officer_result && $officer_result->num_rows > 0) {
            $officer = $officer_result->fetch_assoc();
            $work_province = $officer['work_province'];
            $work_district = $officer['work_district'];
            $work_municipality = $officer['work_municipality'];
            $work_ward = $officer['work_ward'];
            
            // Check if ward exists
            $ward_query = "SELECT id FROM wards 
                          WHERE province = '$work_province' 
                          AND district = '$work_district' 
                          AND municipality = '$work_municipality' 
                          AND ward_number = $work_ward 
                          LIMIT 1";
            $ward_result = $conn->query($ward_query);
            
            if ($ward_result && $ward_result->num_rows > 0) {
                // Ward exists - approve officer and assign ward_id
                $ward = $ward_result->fetch_assoc();
                $ward_id = $ward['id'];
                
                $query = "UPDATE users 
                         SET status = '$status', assigned_ward_id = $ward_id 
                         WHERE id = $id AND role = 'officer'";
                
                if ($conn->query($query)) {
                    echo json_encode([
                        "success" => true, 
                        "message" => "Officer approved and assigned to ward",
                        "ward_id" => $ward_id
                    ]);
                } else {
                    echo json_encode([
                        "success" => false, 
                        "message" => "Error updating officer: " . $conn->error
                    ]);
                }
            } else {
                // Ward doesn't exist - cannot approve
                echo json_encode([
                    "success" => false, 
                    "message" => "Cannot approve officer. Ward $work_ward in $work_municipality, $work_district has not been created yet. Please create the ward first.",
                    "ward_missing" => true
                ]);
            }
        } else {
            echo json_encode([
                "success" => false, 
                "message" => "Officer not found"
            ]);
        }
    } else {
        // Rejecting officer - no ward check needed
        $query = "UPDATE users SET status = '$status' WHERE id = $id AND role = 'officer'";
        
        if ($conn->query($query)) {
            echo json_encode([
                "success" => true, 
                "message" => "Officer status updated to $status"
            ]);
        } else {
            echo json_encode([
                "success" => false, 
                "message" => "Error: " . $conn->error
            ]);
        }
    }
} else {
    echo json_encode(array("success" => false, "message" => "Incomplete data."));
}
?>
