<?php
require_once '../db_connect.php';

// Get a user
$user = $conn->query("SELECT id FROM users LIMIT 1")->fetch_assoc();
// Get a work
$work = $conn->query("SELECT id FROM works LIMIT 1")->fetch_assoc();

echo "User ID: " . ($user['id'] ?? 'None') . "\n";
echo "Work ID: " . ($work['id'] ?? 'None') . "\n";

// Test reaction
if ($user && $work) {
    $url = 'http://localhost/new-react-app/Backend/api/works/toggle_work_like.php';
    $data = [
        'work_id' => $work['id'],
        'user_id' => $user['id'],
        'reaction_type' => 'love'
    ];
    
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    echo "API Response: " . $result . "\n";
}
?>
