-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: find
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `freight`
--

DROP TABLE IF EXISTS `freight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freight` (
  `idFreight` int NOT NULL AUTO_INCREMENT,
  `weight` float NOT NULL,
  `length` float NOT NULL,
  `warehouse` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `note` varchar(100) NOT NULL,
  `idProducer` int NOT NULL,
  `idSupplier` int DEFAULT NULL,
  `idStatus` int NOT NULL,
  `idLoad` int NOT NULL,
  PRIMARY KEY (`idFreight`),
  KEY `_idx` (`idProducer`),
  KEY `dadsa_idx` (`idSupplier`),
  KEY `fkStatus_idx` (`idStatus`),
  KEY `fkLoad_idx` (`idLoad`),
  CONSTRAINT `fkLoad` FOREIGN KEY (`idLoad`) REFERENCES `load` (`idLoad`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkProducer` FOREIGN KEY (`idProducer`) REFERENCES `company` (`idCompany`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkStatus` FOREIGN KEY (`idStatus`) REFERENCES `status` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fkSuplier` FOREIGN KEY (`idSupplier`) REFERENCES `company` (`idCompany`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freight`
--

LOCK TABLES `freight` WRITE;
/*!40000 ALTER TABLE `freight` DISABLE KEYS */;
INSERT INTO `freight` VALUES (1,11.5,12.4,'Nis','Lisbon','fragile',1,NULL,1,1);
/*!40000 ALTER TABLE `freight` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-03 21:23:03
