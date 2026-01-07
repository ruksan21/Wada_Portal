<?php
/**
 * Strict Ward Resolver
 * Resolve ward_id using full address: province + district + municipality + ward_number
 * Returns 0 if no exact match is found.
 */

function resolveWardIdStrict($conn, $province, $district, $municipality, $wardNumber) {
    if (!$province || !$district || !$municipality || !$wardNumber) {
        return 0;
    }

    $sql = "SELECT w.id
            FROM wards w
            INNER JOIN districts d ON w.district_id = d.id
            WHERE d.province = ? AND d.name = ? AND w.municipality = ? AND w.ward_number = ?
            LIMIT 1";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        return 0;
    }

    $stmt->bind_param("sssi", $province, $district, $municipality, $wardNumber);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res && $res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $stmt->close();
        return (int)$row['id'];
    }

    $stmt->close();
    return 0;
}
