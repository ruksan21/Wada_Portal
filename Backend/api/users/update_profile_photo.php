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

$upload_dir = "../auth/uploads/";
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

function handleFileUpload($file, $prefix, $upload_dir) {
    if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
        return ["success" => false, "message" => "Upload failed or no file provided."];
    }
    
    $allowed_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    $mime_type = $file['type'];
    
    if (!in_array($mime_type, $allowed_types)) {
        return ["success" => false, "message" => "Invalid file type ($mime_type). Only images allowed."];
    }
    
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $new_filename = $prefix . "_" . time() . "_" . uniqid() . "." . $extension;
    
    if (move_uploaded_file($file['tmp_name'], $upload_dir . $new_filename)) {
        return ["success" => true, "filename" => $new_filename];
    }
    
    return ["success" => false, "message" => "Failed to move uploaded file."];
}

if (!isset($_POST['user_id']) || !isset($_FILES['profilePhoto'])) {
    echo json_encode(["success" => false, "message" => "Missing user ID or photo file."]);
    exit();
}

$user_id = intval($_POST['user_id']);

$upload_result = handleFileUpload($_FILES['profilePhoto'], "profile", $upload_dir);

if ($upload_result['success']) {
    $filename = $upload_result['filename'];
    
    // Update database
    $stmt = $conn->prepare("UPDATE users SET photo = ? WHERE id = ?");
    $stmt->bind_param("si", $filename, $user_id);
    
    if ($stmt->execute()) {
        // Construct full URL
        $photo_url = "http://localhost/my-react-app/Backend/api/auth/uploads/" . $filename;
        echo json_encode([
            "success" => true, 
            "message" => "Profile photo updated successfully.",
            "photo_filename" => $filename,
            "photo_url" => $photo_url
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update database."]);
    }
    $stmt->close();
} else {
    echo json_encode($upload_result);
}

$conn->close();
?>
