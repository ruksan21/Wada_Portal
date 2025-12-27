-- Create tables for work feedback and followers
CREATE TABLE IF NOT EXISTS `work_feedback` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `work_id` INT NOT NULL,
    `user_id` INT DEFAULT NULL,
    `user_name` VARCHAR(255) DEFAULT 'Anonymous',
    `rating` INT NOT NULL CHECK (
        rating >= 1
        AND rating <= 5
    ),
    `comment` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`work_id`) REFERENCES `development_works`(`id`) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `followers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `officer_id` INT NOT NULL,
    `follower_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_follow` (`officer_id`, `follower_id`)
);