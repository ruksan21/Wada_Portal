<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once '../db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

// Handle preflight
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if ($method === 'DELETE') {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            throw new Exception("Missing complaint ID");
        }
        
        $id = intval($data['id']);
        $stmt = $conn->prepare("DELETE FROM complaints WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Complaint deleted successfully"]);
        } else {
            throw new Exception("Error deleting complaint: " . $stmt->error);
        }
    } 
    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id']) || !isset($data['subject']) || !isset($data['message'])) {
            throw new Exception("Missing required fields for update");
        }
        
        $id = intval($data['id']);
        $subject = $conn->real_escape_string($data['subject']);
        $message = $conn->real_escape_string($data['message']);
        $priority = $conn->real_escape_string($data['priority'] ?? 'Medium');
        
        $stmt = $conn->prepare("UPDATE complaints SET subject = ?, message = ?, priority = ? WHERE id = ?");
        $stmt->bind_param("sssi", $subject, $message, $priority, $id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Complaint updated successfully"]);
        } else {
            throw new Exception("Error updating complaint: " . $stmt->error);
        }
    }
    else {
        throw new Exception("Unsupported request method");
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

$conn->close();
?>
