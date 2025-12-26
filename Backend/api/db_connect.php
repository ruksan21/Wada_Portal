<?php
// Database variables (XAMPP default)
$host = "localhost";
$db_name = "ward_management";
$username = "root";
$password = "";

// MySQLi Object-Oriented style ma connection gareko
$conn = new mysqli($host, $username, $password, $db_name);

// Connection check gareko: error xabhane message dekhauxa
if ($conn->connect_error) {
    die("Database sanga connect huna sakiyena: " . $conn->connect_error);
}

// Nepali text support garna ko lagi char-set set gareko
$conn->set_charset("utf8mb4");
?>
