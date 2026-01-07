<?php
require_once 'Backend/db_connect.php';

// Open or create the output file
$myfile = fopen("ward_dump.txt", "w") or die("Unable to open file!");

fwrite($myfile, "=== DEBUG WARD DUMP ===\n");

// 1. Check all wards in Sunsari district (broad search)
$sql = "SELECT * FROM wards WHERE district LIKE '%Sunsari%' OR district LIKE '%sunsari%'";
$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        fwrite($myfile, "Found " . $result->num_rows . " wards in Sunsari:\n");
        while($row = $result->fetch_assoc()) {
            $line = "ID: " . $row['id'] . 
                    " | Prov: [" . $row['province'] . "]" . 
                    " | Dist: [" . $row['district'] . "]" .
                    " | Muni: [" . $row['municipality'] . "]" .
                    " | Ward: [" . $row['ward_number'] . "]\n";
            fwrite($myfile, $line);
        }
    } else {
        fwrite($myfile, "No wards found matching 'Sunsari'. Dumping all wards (limit 20):\n");
        $all_res = $conn->query("SELECT * FROM wards LIMIT 20");
        while($row = $all_res->fetch_assoc()) {
             $line = "ID: " . $row['id'] . 
                    " | Prov: [" . $row['province'] . "]" . 
                    " | Dist: [" . $row['district'] . "]" .
                    " | Muni: [" . $row['municipality'] . "]" .
                    " | Ward: [" . $row['ward_number'] . "]\n";
            fwrite($myfile, $line);
        }
    }
} else {
    fwrite($myfile, "Query Error: " . $conn->error . "\n");
}

fclose($myfile);
echo "Dump complete to ward_dump.txt";
?>
