<?php
/**
 * Verify Ward Access
 * Checks if an officer has access to a specific ward based on their work location
 */

function verifyWardAccess($conn, $officer_id, $ward_id) {
    if ($officer_id <= 0 || $ward_id <= 0) {
        return false;
    }
    
    // Get the ward details
    $ward_sql = "SELECT province, district, municipality, ward_number FROM wards WHERE id = ?";
    $ward_stmt = $conn->prepare($ward_sql);
    $ward_stmt->bind_param("i", $ward_id);
    $ward_stmt->execute();
    $ward_result = $ward_stmt->get_result();
    
    if ($ward_result->num_rows === 0) {
        return false;
    }
    
    $ward = $ward_result->fetch_assoc();
    
    // Get the officer's work location
    $officer_sql = "SELECT work_province, work_district, work_municipality, work_ward FROM users WHERE id = ?";
    $officer_stmt = $conn->prepare($officer_sql);
    $officer_stmt->bind_param("i", $officer_id);
    $officer_stmt->execute();
    $officer_result = $officer_stmt->get_result();
    
    if ($officer_result->num_rows === 0) {
        return false;
    }
    
    $officer = $officer_result->fetch_assoc();
    
    // Compare officer's work location with ward location using fuzzy matching
    $province_match = empty($ward['province']) || empty($officer['work_province']) ||
        stripos(trim($ward['province']), trim($officer['work_province'])) !== false ||
        stripos(trim($officer['work_province']), trim($ward['province'])) !== false;
    
    $district_match = empty($ward['district']) || empty($officer['work_district']) ||
        stripos(trim($ward['district']), trim($officer['work_district'])) !== false ||
        stripos(trim($officer['work_district']), trim($ward['district'])) !== false;
    
    $municipality_match = 
        stripos(trim($ward['municipality']), trim($officer['work_municipality'])) !== false ||
        stripos(trim($officer['work_municipality']), trim($ward['municipality'])) !== false;
    
    $ward_number_match = (int)$ward['ward_number'] === (int)$officer['work_ward'];
    
    return $province_match && $district_match && $municipality_match && $ward_number_match;
}
?>
