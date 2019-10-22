-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bouncemna
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bouncemna
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bouncemna` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bouncemna` ;

-- -----------------------------------------------------
-- Table `bouncemna`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`account` (
  `userID` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `gender` VARCHAR(1) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  `hash` VARCHAR(180) NULL DEFAULT NULL,
  `bio` VARCHAR(500) NULL DEFAULT NULL,
  `profilePic` BLOB NULL DEFAULT NULL,
  `dob` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`alert`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`alert` (
  `alertID` INT(11) NOT NULL AUTO_INCREMENT,
  `diagnosis` VARCHAR(45) NULL DEFAULT NULL,
  `sendMessage` VARCHAR(45) NULL DEFAULT NULL,
  `anonymity` VARCHAR(45) NULL DEFAULT NULL,
  `dateDiagnosed` VARCHAR(45) NULL DEFAULT NULL,
  `dateSent` VARCHAR(45) NULL DEFAULT NULL,
  `userID` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`alertID`))
ENGINE = InnoDB
AUTO_INCREMENT = 46
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`alertedpartners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`alertedpartners` (
  `contactID` VARCHAR(45) NULL DEFAULT NULL,
  `alertID` VARCHAR(45) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`contact` (
  `contactID` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `gender` VARCHAR(1) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `notes` VARCHAR(45) NULL DEFAULT NULL,
  `rating` VARCHAR(45) NULL DEFAULT NULL,
  `userID` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`contactID`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`encounter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`encounter` (
  `encounterID` INT(11) NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(45) NULL DEFAULT NULL,
  `dateEncounter` DATE NULL DEFAULT NULL,
  `notes` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`encounterID`))
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`encounteracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`encounteracts` (
  `encounterID` INT(11) NULL DEFAULT NULL,
  `actID` INT(11) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`encounterpartners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`encounterpartners` (
  `encounterID` INT(11) NOT NULL,
  `contactID` INT(11) NOT NULL,
  PRIMARY KEY (`encounterID`, `contactID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`encounterprotection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`encounterprotection` (
  `encounterID` INT(11) NOT NULL,
  `protectionID` INT(11) NOT NULL,
  PRIMARY KEY (`encounterID`, `protectionID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`protection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`protection` (
  `protectionID` INT(11) NOT NULL,
  `protectionName` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`protectionID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`sexualacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`sexualacts` (
  `actID` INT(11) NOT NULL,
  `actName` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`actID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`addevents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS  `addevents` (
  `eventID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `timestart` int(5) DEFAULT NULL,
  `timeend` int(5) DEFAULT NULL,
  `alert` varchar(45) DEFAULT NULL,
  `repeat` varchar(45) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bouncemna`.`sti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bouncemna`.`sti` (
  `stiID` INT(11) NOT NULL,
  `stiName` VARCHAR(45) NULL DEFAULT NULL,
  `tracingPeriod` VARCHAR(90) NULL DEFAULT NULL,
  `numberOfMonths` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`stiID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


CREATE TABLE IF NOT EXISTS  `addevents` (
  `eventID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `timestart` int(5) DEFAULT NULL,
  `timeend` int(5) DEFAULT NULL,
  `alert` varchar(45) DEFAULT NULL,
  `repeat` varchar(45) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`eventID`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

INSERT INTO `sti` VALUES (1,'Chlamydia','6 months',6),(2,'Gonorrhea','2 months',2),(3,'HIV','Onset of risk behaviour or latest negative HIV test',0),(4,'Mycoplasma genitalium','6 months or guided by sexual history',6),(5,'Primary Syphilis','3 months before symptoms',3),(6,'Secondary Syphilis','6 months before symptoms',6),(7,'Early Latent Syphilis','12 months before symptoms',12);

INSERT INTO `sexualacts` VALUES (1,'Vaginal sex'),(2,'Anal sex'),(3,'Oral sex'),(4,'Other');

INSERT INTO `protection` VALUES (1,'Condom'),(2,'PrEP');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
