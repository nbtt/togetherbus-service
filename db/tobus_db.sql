# ************************************************************
# Sequel Ace SQL dump
# Version 20046
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 8.0.32)
# Database: tobus_db
# Generation Time: 2023-05-23 01:11:55 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `phone` char(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table account_login
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account_login`;

CREATE TABLE `account_login` (
  `accountId` int NOT NULL,
  `date` timestamp NOT NULL,
  PRIMARY KEY (`accountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table bus_route
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bus_route`;

CREATE TABLE `bus_route` (
  `busNo` char(6) NOT NULL,
  `operatingTime` char(14) NOT NULL,
  `price` bigint NOT NULL,
  `priceStudent` bigint NOT NULL,
  `priceGroup` bigint NOT NULL,
  `numTrips` int NOT NULL,
  `tripTime` char(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`busNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `bus_route` WRITE;
/*!40000 ALTER TABLE `bus_route` DISABLE KEYS */;

INSERT INTO `bus_route` (`busNo`, `operatingTime`, `price`, `priceStudent`, `priceGroup`, `numTrips`, `tripTime`, `name`, `type`)
VALUES
	('08','05:00 - 20:30',7000,3000,120500,40,'70','Bến xe Q8 - ĐHQG','Phổ thông - Có trợ giá'),
	('104','04:20 - 10:30',10000,-1,-1,10,'10','Test','Test');

/*!40000 ALTER TABLE `bus_route` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bus_stop
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bus_stop`;

CREATE TABLE `bus_stop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` char(10) NOT NULL,
  `lat` decimal(8,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `addressNo` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `zone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table bus_timetable
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bus_timetable`;

CREATE TABLE `bus_timetable` (
  `id` int NOT NULL,
  `routeNo` char(6) NOT NULL,
  `direction` enum('go','return') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_75c4df93bf2885d45a57e93909` (`routeNo`,`direction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table bus_trip
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bus_trip`;

CREATE TABLE `bus_trip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order` int NOT NULL,
  `startTime` char(5) NOT NULL,
  `endTime` char(5) NOT NULL,
  `timetableId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_time` timestamp NOT NULL,
  `discount` bigint NOT NULL,
  `amount` bigint NOT NULL,
  `accountPhone` char(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_05776fef1b9c9c36aee5ab85d0` (`created_time`),
  KEY `IDX_aa7fe03b4a4ef0377d2a92e33f` (`accountPhone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table order_item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_item`;

CREATE TABLE `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `discount` bigint NOT NULL,
  `amount` bigint NOT NULL,
  `routeBusNo` char(6) DEFAULT NULL,
  `orderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_646bf9ece6f45dbe41c203e06e` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table route_stop
# ------------------------------------------------------------

DROP TABLE IF EXISTS `route_stop`;

CREATE TABLE `route_stop` (
  `routeNo` char(6) NOT NULL,
  `stopId` int NOT NULL,
  `direction` enum('go','return') NOT NULL,
  `order` int NOT NULL,
  PRIMARY KEY (`routeNo`,`stopId`,`direction`,`order`),
  KEY `IDX_fab4087257db8e11e5a327c55d` (`stopId`),
  CONSTRAINT `FK_92a5bfd0ecff581fd680e8ab17c` FOREIGN KEY (`routeNo`) REFERENCES `bus_route` (`busNo`),
  CONSTRAINT `FK_fab4087257db8e11e5a327c55da` FOREIGN KEY (`stopId`) REFERENCES `bus_stop` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
