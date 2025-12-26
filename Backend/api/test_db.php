<?php
// Database connection file lyayeko
require_once 'db_connect.php';

// Connection check gareko
if ($conn->connect_error) {
    echo "<div style='color: red; font-family: sans-serif;'>";
    echo "<h1>❌ Error: Database sanga connect huna sakiyena.</h1>";
    echo "<p>Karan: " . $conn->connect_error . "</p>";
    echo "</div>";
} else {
    echo "<div style='color: green; font-family: sans-serif;'>";
    echo "<h1>✅ Sabbai thik xa! Database sanga safalata-purwak connect bhayo.</h1>";
    echo "<p>Database Name: ward_management</p>";
    echo "</div>";
}
?>
