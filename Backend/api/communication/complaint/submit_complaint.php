<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../../db_connect.php';

$response = array("success" => false, "message" => "Unknown error");

// Input can come from $_POST (for FormData) or php://input (for JSON)
// Since we are adding file uploads, we expect FormData.

$ward_id = isset($_POST['ward_id']) ? intval($_POST['ward_id']) : null;
$ward = isset($_POST['ward']) ? intval($_POST['ward']) : null;
$full_name = isset($_POST['fullName']) ? $_POST['fullName'] : null;
$subject = isset($_POST['subject']) ? $_POST['subject'] : null;
$message = isset($_POST['message']) ? $_POST['message'] : null;
$priority = isset($_POST['priority']) ? $_POST['priority'] : 'Medium';
$user_id = isset($_POST['userId']) ? intval($_POST['userId']) : null;

$province = $_POST['province'] ?? null;
$municipality = $_POST['municipality'] ?? null;
$ward_number = $_POST['ward'] ?? null;

// JSON fallback
if (empty($_POST) && empty($_FILES)) {
    $data = json_decode(file_get_contents("php://input"));
    if ($data) {
        $ward_id = isset($data->ward_id) ? intval($data->ward_id) : null;
        $province = $data->province ?? null;
        $municipality = $data->municipality ?? null;
        $ward_number = $data->ward ?? null;
        $full_name = $data->fullName ?? null;
        $subject = $data->subject ?? null;
        $message = $data->message ?? null;
        $priority = $data->priority ?? 'Medium';
        $user_id = isset($data->userId) ? intval($data->userId) : null;
    }
}

if (!$ward_id && $province && $municipality && $ward_number) {
    // Resolve ward ID from location details
    $stmt = $conn->prepare("SELECT id FROM wards WHERE province = ? AND municipality = ? AND ward_number = ? LIMIT 1");
    $stmt->bind_param("ssi", $province, $municipality, $ward_number);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res && $res->num_rows > 0) {
        $ward_id = $res->fetch_assoc()['id'];
    }
} else {
    // ... rest of the file
}
?>
