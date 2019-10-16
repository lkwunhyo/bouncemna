CREATE DATABASE  IF NOT EXISTS `bouncemna` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `bouncemna`;
-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: bouncemna
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('daryl','aladdinGdsd','tako','f','dtjh@live.com.sg','232123asd','$2b$10$NkYDw53VGCLfqCFUeNqu5enaLMSgtW0hob3xAVCY3YJszL0S9ekPK','dd',NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `alert`
--

LOCK TABLES `alert` WRITE;
/*!40000 ALTER TABLE `alert` DISABLE KEYS */;
INSERT INTO `alert` VALUES (1,'Mycoplasma genitalium','true','anonymous','02-09-2019',NULL,'daryl'),(2,'Mycoplasma genitalium','true','anonymous','03-09-2019',NULL,'daryl'),(3,'Gonorrhea','true','anonymous','11-09-2019',NULL,'daryl'),(4,'Primary Syphilis','true','anonymous','12-09-2019',NULL,'daryl'),(5,'Primary Syphilis','true','identified','10-09-2019',NULL,'daryl'),(6,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(7,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(8,'Mycoplasma genitalium','true','anonymous','15-09-2019',NULL,'daryl'),(9,'Primary Syphilis','true','identified',NULL,NULL,'daryl'),(11,'Mycoplasma genitalium','true','anonymous','08-09-2019',NULL,'daryl'),(12,'HIV','true','anonymous',NULL,NULL,'daryl'),(13,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(14,'Gonorrhea','true','anonymous',NULL,NULL,'daryl'),(15,'HIV','true','anonymous',NULL,NULL,'daryl'),(16,'Primary Syphilis','true','anonymous',NULL,NULL,'daryl'),(17,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(18,'HIV','true','anonymous',NULL,NULL,'daryl'),(19,'HIV','true','anonymous','08-09-2019',NULL,'daryl'),(20,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(21,'HIV','true','anonymous','10-09-2019',NULL,'daryl'),(22,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(23,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(24,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(25,'Mycoplasma genitalium','true','identified',NULL,NULL,'daryl'),(26,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(27,'HIV','true','anonymous',NULL,NULL,'daryl'),(28,'HIV','true','anonymous',NULL,NULL,'daryl'),(29,'Mycoplasma genitalium','true','anonymous',NULL,NULL,'daryl'),(30,'HIV','true','anonymous',NULL,NULL,'daryl'),(31,'Gonorrhea','true','anonymous','01-09-2019',NULL,'daryl'),(32,'HIV','true','identified','01-09-2019',NULL,'daryl'),(33,'HIV','true','identified',NULL,NULL,'daryl'),(34,'Mycoplasma genitalium','true','anonymous','09-09-2019',NULL,'daryl'),(35,'Gonorrhea','true','anonymous','12-09-2019',NULL,'daryl'),(36,'Mycoplasma genitalium','true','anonymous','10-09-2019',NULL,'daryl'),(37,'Primary Syphilis','true','anonymous','15-10-2019',NULL,'daryl'),(38,'HIV','true',NULL,'2019-10-01',NULL,'daryl'),(39,'Gonorrhea','true',NULL,'2019-10-02',NULL,'daryl'),(40,'Chlamydia','true','identified','2019-10-02',NULL,'daryl'),(41,'Gonorrhea','true','anonymous','2019-10-08',NULL,'daryl'),(42,'Gonorrhea','true','anonymous','2019-10-02',NULL,'daryl'),(43,'Gonorrhea','true','anonymous','2019-10-02',NULL,'daryl'),(44,'HIV','true',NULL,NULL,NULL,'daryl'),(45,'Gonorrhea','true','anonymous','2019-10-08',NULL,'daryl');
/*!40000 ALTER TABLE `alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `alertedpartners`
--

LOCK TABLES `alertedpartners` WRITE;
/*!40000 ALTER TABLE `alertedpartners` DISABLE KEYS */;
INSERT INTO `alertedpartners` VALUES ('2','30'),('1','30'),('3','31'),('3','32'),('3','33'),('3','34'),('3','35'),('3','36'),('3','39'),('1','41'),('3','41'),('1','42'),('3','42'),('1','43'),('3','43'),('1','45');
/*!40000 ALTER TABLE `alertedpartners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'wendy','wendy','f','123123','dtjh@live.com.sg',NULL,NULL,'daryl'),(2,'sdsd','sdsd',NULL,NULL,NULL,NULL,NULL,'daryl'),(3,'123123','123123','m',NULL,'asd123@.c',NULL,NULL,'daryl'),(4,'new','new','f',NULL,NULL,NULL,NULL,'daryl'),(5,'rt','rt','f',NULL,NULL,NULL,NULL,'daryl'),(6,'1233','1233',NULL,NULL,NULL,NULL,NULL,'daryl'),(28,'asddd','asdasd','m',NULL,NULL,NULL,NULL,'daryl');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `encounter`
--

LOCK TABLES `encounter` WRITE;
/*!40000 ALTER TABLE `encounter` DISABLE KEYS */;
INSERT INTO `encounter` VALUES (1,'daryl','2019-02-15',NULL),(3,'daryl','2019-09-16',NULL),(5,'daryl','2019-09-15',NULL),(6,'daryl','2019-09-15',NULL),(7,'daryl','2019-09-15',NULL),(8,'daryl','2019-09-15',NULL),(9,'daryl','2019-09-15',NULL),(10,'daryl','2019-09-15',NULL),(11,'daryl','2019-09-15',NULL),(12,'daryl','2019-09-15',NULL),(13,'daryl','2019-09-15',NULL),(14,'daryl','2019-09-15',NULL),(15,'daryl','2019-09-15',NULL),(16,'daryl','2019-09-15',NULL),(17,'daryl','2019-09-15',NULL),(18,'daryl','2019-09-15',NULL),(19,'daryl','2019-09-15',NULL),(21,'daryl','2019-09-15',NULL),(22,'daryl','2019-09-15',NULL),(23,'daryl','2019-09-15',NULL),(24,'daryl','2019-09-15',NULL),(25,'daryl','2019-09-15',NULL),(26,'daryl','2019-09-15',NULL),(27,'daryl','2019-09-15',NULL),(28,'daryl','2019-09-15',NULL),(29,'daryl','2019-09-15',NULL),(30,'daryl','2019-09-15',NULL),(31,'daryl','2019-09-15',NULL),(32,'daryl','2019-09-16',NULL),(33,'daryl','2019-10-01',NULL),(34,'daryl','2019-09-01',NULL),(35,'daryl','2019-12-01',NULL),(36,'daryl','2019-10-16','lol');
/*!40000 ALTER TABLE `encounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `encounteracts`
--

LOCK TABLES `encounteracts` WRITE;
/*!40000 ALTER TABLE `encounteracts` DISABLE KEYS */;
INSERT INTO `encounteracts` VALUES (26,1),(26,2),(27,1),(27,2),(28,1),(28,2),(28,3),(29,1),(29,2),(29,3),(29,4),(30,1),(30,2),(30,3),(30,4),(31,1),(31,2),(31,4),(32,1),(32,2),(32,3),(36,1),(36,3);
/*!40000 ALTER TABLE `encounteracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `encounterpartners`
--

LOCK TABLES `encounterpartners` WRITE;
/*!40000 ALTER TABLE `encounterpartners` DISABLE KEYS */;
INSERT INTO `encounterpartners` VALUES (1,2),(1,5),(3,1),(3,3),(33,2),(33,4),(34,1),(35,6),(36,5),(36,6);
/*!40000 ALTER TABLE `encounterpartners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `encounterprotection`
--

LOCK TABLES `encounterprotection` WRITE;
/*!40000 ALTER TABLE `encounterprotection` DISABLE KEYS */;
INSERT INTO `encounterprotection` VALUES (26,2),(36,1);
/*!40000 ALTER TABLE `encounterprotection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `protection`
--

LOCK TABLES `protection` WRITE;
/*!40000 ALTER TABLE `protection` DISABLE KEYS */;
INSERT INTO `protection` VALUES (1,'Condom'),(2,'PrEP');
/*!40000 ALTER TABLE `protection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sexualacts`
--

LOCK TABLES `sexualacts` WRITE;
/*!40000 ALTER TABLE `sexualacts` DISABLE KEYS */;
INSERT INTO `sexualacts` VALUES (1,'Vaginal sex'),(2,'Anal sex'),(3,'Oral sex'),(4,'Other');
/*!40000 ALTER TABLE `sexualacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sti`
--

LOCK TABLES `sti` WRITE;
/*!40000 ALTER TABLE `sti` DISABLE KEYS */;
INSERT INTO `sti` VALUES (1,'Chlamydia','6 months',6),(2,'Gonorrhea','2 months',2),(3,'HIV','Onset of risk behaviour or latest negative HIV test',0),(4,'Mycoplasma genitalium','6 months or guided by sexual history',6),(5,'Primary Syphilis','3 months before symptoms',3),(6,'Secondary Syphilis','6 months before symptoms',6),(7,'Early Latent Syphilis','12 months before symptoms',12);
/*!40000 ALTER TABLE `sti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-16 17:06:05
