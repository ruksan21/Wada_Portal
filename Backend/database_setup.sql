-- Development Works Database Table
-- यो script PhpMyAdmin मा SQL tab मा paste गर्नुहोस्
CREATE TABLE IF NOT EXISTS `development_works` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `budget` VARCHAR(255),
    `location` VARCHAR(255),
    `start_date` DATE,
    `end_date` DATE,
    `beneficiaries` VARCHAR(255),
    `status` ENUM('pending', 'ongoing', 'completed') DEFAULT 'pending',
    `image` VARCHAR(255),
    `officer_id` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- Sample data (optional - testing को लागि)
INSERT INTO `development_works` (
        `title`,
        `description`,
        `budget`,
        `start_date`,
        `end_date`,
        `beneficiaries`,
        `status`
    )
VALUES (
        'Road Repair Work',
        'Main road repair and improvement',
        '20,00,000',
        '2022-08-17',
        '2022-12-11',
        '5,000',
        'completed'
    ),
    (
        'Park Renovation',
        'Community park renovation with new facilities',
        '15,00,000',
        '2023-01-15',
        '2023-06-30',
        '2,500',
        'ongoing'
    );