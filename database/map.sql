-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.14-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for testmap
DROP DATABASE IF EXISTS `testmap`;
CREATE DATABASE IF NOT EXISTS `testmap` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `testmap`;

-- Dumping structure for table testmap.tm_project
DROP TABLE IF EXISTS `tm_project`;
CREATE TABLE IF NOT EXISTS `tm_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `lat` text NOT NULL DEFAULT '',
  `lng` text NOT NULL DEFAULT '',
  `sitename` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `project` (`project`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table testmap.tm_project: ~3 rows (approximately)
DELETE FROM `tm_project`;
/*!40000 ALTER TABLE `tm_project` DISABLE KEYS */;
INSERT INTO `tm_project` (`id`, `project`, `description`, `lat`, `lng`, `sitename`) VALUES
	(1, 'as', 'as', '3.0', '22.0', 'Now'),
	(3, 'asas', 'asasas', '80.28359145363193', '13.059905807623016', 'www.test.com'),
	(10, 'G', 'G', '', '', ''),
	(12, 'HI', 'Hii', '', '', '');
/*!40000 ALTER TABLE `tm_project` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
