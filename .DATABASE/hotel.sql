/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MariaDB
 Source Server Version : 100411
 Source Host           : localhost:3306
 Source Schema         : hotel

 Target Server Type    : MariaDB
 Target Server Version : 100411
 File Encoding         : 65001

 Date: 20/06/2020 22:15:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client`  (
  `client_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `forename` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`client_id`) USING BTREE,
  UNIQUE INDEX `uq_client_email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of client
-- ----------------------------
INSERT INTO `client` VALUES (1, 'Perislav', 'Perislavljevic', 'pperisa@mail.rs', '+381651234567');
INSERT INTO `client` VALUES (2, 'Mina', 'Minic', 'mminic@mojmail.com', '+381112321320');
INSERT INTO `client` VALUES (3, 'Bos', 'Gazdic', 'gazda@mail.rs', '+3812232324');
INSERT INTO `client` VALUES (4, 'Mika', 'Biznisic', 'mika@biznis.org', '+385827315');
INSERT INTO `client` VALUES (5, 'Zika', 'Mikic', 'zikica@mail.es', '+4072364859');
INSERT INTO `client` VALUES (6, 'Test', 'Testic', 'test@testiic.rs', '+123456');
INSERT INTO `client` VALUES (8, 'Vasa', 'Mravic', 'vasa@testiic.rs', '+323173812');

-- ----------------------------
-- Table structure for conference_room
-- ----------------------------
DROP TABLE IF EXISTS `conference_room`;
CREATE TABLE `conference_room`  (
  `conference_room_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `area` decimal(20, 2) NOT NULL,
  `projector` tinyint(1) NOT NULL,
  `platform` tinyint(1) NOT NULL,
  `sound_system` tinyint(1) NOT NULL,
  `rentable_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`conference_room_id`) USING BTREE,
  UNIQUE INDEX `fk_conference_room_rentable_id`(`rentable_id`) USING BTREE,
  CONSTRAINT `fk_conference_room_rentable_id` FOREIGN KEY (`rentable_id`) REFERENCES `rentable` (`rentable_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conference_room
-- ----------------------------
INSERT INTO `conference_room` VALUES (1, 50.00, 1, 1, 1, 1);
INSERT INTO `conference_room` VALUES (2, 350.00, 1, 1, 1, 4);

-- ----------------------------
-- Table structure for rentable
-- ----------------------------
DROP TABLE IF EXISTS `rentable`;
CREATE TABLE `rentable`  (
  `rentable_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `max_capacity` int(10) NOT NULL,
  `wifi` tinyint(1) NULL DEFAULT NULL,
  `price` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`rentable_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rentable
-- ----------------------------
INSERT INTO `rentable` VALUES (1, 50, 1, 35000.00);
INSERT INTO `rentable` VALUES (2, 3, 1, 550.00);
INSERT INTO `rentable` VALUES (3, 2, 1, 600.00);
INSERT INTO `rentable` VALUES (4, 150, 1, 60000.00);
INSERT INTO `rentable` VALUES (5, 6, 0, 398.00);
INSERT INTO `rentable` VALUES (6, 2, 0, 400.00);

-- ----------------------------
-- Table structure for reservation
-- ----------------------------
DROP TABLE IF EXISTS `reservation`;
CREATE TABLE `reservation`  (
  `reservation_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` int(10) UNSIGNED NOT NULL,
  `rentable_id` int(10) UNSIGNED NOT NULL,
  `from_date` datetime(0) NOT NULL,
  `to_date` datetime(0) NOT NULL,
  `reservation_date` timestamp(0) NOT NULL DEFAULT current_timestamp,
  `total_price` decimal(10, 2) NOT NULL,
  `note` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`reservation_id`) USING BTREE,
  INDEX `fk_reservation_client_id`(`client_id`) USING BTREE,
  INDEX `fk_reservation_rentable_id`(`rentable_id`) USING BTREE,
  INDEX `fk_reservation_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `fk_reservation_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_reservation_rentable_id` FOREIGN KEY (`rentable_id`) REFERENCES `rentable` (`rentable_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_reservation_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reservation
-- ----------------------------
INSERT INTO `reservation` VALUES (1, 3, 4, '2020-06-30 10:00:00', '2020-07-01 10:00:00', '2020-06-19 11:02:36', 60000.00, 'Potrebna faktura', 1);
INSERT INTO `reservation` VALUES (2, 1, 5, '2020-07-01 12:00:00', '2020-07-05 12:45:25', '2020-06-20 12:46:08', 10000.00, 'Placeno', 2);

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `room_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `num_of_beds` int(2) NOT NULL,
  `bed_type` enum('single','double','bunk_bed','king_size') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `balcony` tinyint(1) NOT NULL,
  `orientation` enum('east','west','south','north') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `floor` int(3) NOT NULL,
  `closet` tinyint(1) NOT NULL,
  `hairdryer` tinyint(1) NOT NULL,
  `desk` tinyint(1) NOT NULL,
  `air_conditioner` tinyint(1) NOT NULL,
  `room_number` int(3) NOT NULL,
  `rentable_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`room_id`) USING BTREE,
  UNIQUE INDEX `uq_room_room_number`(`room_number`) USING BTREE,
  UNIQUE INDEX `fk_room_rentable_id`(`rentable_id`) USING BTREE,
  CONSTRAINT `fk_room_rentable_id` FOREIGN KEY (`rentable_id`) REFERENCES `rentable` (`rentable_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (4, 3, 'single', 0, 'east', 1, 1, 1, 0, 0, 101, 2);
INSERT INTO `room` VALUES (5, 1, 'king_size', 1, 'west', 5, 1, 1, 1, 1, 501, 3);
INSERT INTO `room` VALUES (7, 6, 'bunk_bed', 0, 'south', 1, 1, 0, 0, 0, 102, 5);
INSERT INTO `room` VALUES (8, 1, 'double', 1, 'north', 3, 0, 0, 1, 1, 301, 6);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `forename` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `salt` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `registration_date` timestamp(0) NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `uq_user_email`(`email`) USING BTREE,
  UNIQUE INDEX `uq_user_username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Una', 'Tuba', 'Moja ulica 178', '011123456', 'una@mail.rs', 'utuba', 'utuba', 'kgh', '2020-06-18 13:36:42');
INSERT INTO `user` VALUES (2, 'Pera', 'Peric', 'Neka nepoznata ulica 28', '+38165555444', 'pperic@mail.com', 'pperic', 'pperic', 'hjk', '2020-06-18 14:54:59');
INSERT INTO `user` VALUES (3, 'Ana', 'Maric', 'Studentska ulica 18', '+381112345632', 'amaric@mail.rs', 'amaric', 'amaric', 'jke', '2020-06-18 14:55:54');
INSERT INTO `user` VALUES (4, 'Admin', 'Admin', 'Admin Ulica12', '+ADMIN123', 'admin@admin.rs', 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC', '', '2020-06-20 11:41:31');
INSERT INTO `user` VALUES (5, 'Zivan', 'Test', 'Pejicevi Salasi Street 12', '011343523', 'zivan@admin.rs', 'zivan', 'C006E6E8F9B30B4DF5A11817A95097DCA7AD7BD8C7C6FA625B498BB4E143CF7A275B9A4E58CF3B3EFC928FC188923100C0D7015DA7D80A2C5CE764972F82BC59', '', '2020-06-20 13:20:40');

SET FOREIGN_KEY_CHECKS = 1;
