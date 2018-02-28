-- MySQL dump 10.13  Distrib 5.5.36, for Linux (x86_64)
--
-- Host: localhost    Database: xplan
-- ------------------------------------------------------
-- Server version	5.5.36-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ued_tools`
--

DROP TABLE IF EXISTS `ued_tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ued_tools` (
  `tid` int(11) NOT NULL AUTO_INCREMENT COMMENT '工具id',
  `name` varchar(128) NOT NULL COMMENT '工具名称',
  `headimg` varchar(255) DEFAULT NULL COMMENT '工具封面图',
  `downloadAmount` int(11) DEFAULT NULL COMMENT '下载次数',
  `borwser` int(11) DEFAULT NULL COMMENT '浏览次数',
  `author` varchar(32) DEFAULT NULL COMMENT '工具开发者',
  `date` datetime DEFAULT NULL COMMENT '工具发布时间',
  `downloadUrl` varchar(255) DEFAULT NULL COMMENT '下载地址',
  `templateUrl` varchar(255) DEFAULT NULL COMMENT '工具文档地址',
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ued_tools`
--

LOCK TABLES `ued_tools` WRITE;
/*!40000 ALTER TABLE `ued_tools` DISABLE KEYS */;
INSERT INTO `ued_tools` VALUES (1,'Iconfont','assets/img/tools/icon-font-tool.png',NULL,NULL,NULL,NULL,'/ux/ued-resource/tools/IconFont.zip','/doc/tools/iconfont.md'),(2,'MENU生成器','assets/img/tools/menu-tool.png',NULL,NULL,NULL,NULL,'/ux/ued-resource/tools/MenuConf.zip','/doc/tools/menu.md'),(3,'Rest','assets/img/tools/rest-tool.png',NULL,NULL,NULL,NULL,'','/doc/tools/rest.md'),(4,'UI设计器','assets/img/tools/ui-design-tool.png',NULL,NULL,NULL,NULL,'','/doc/tools/uidesign.md');
/*!40000 ALTER TABLE `ued_tools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ued_component_menu_nav`
--

DROP TABLE IF EXISTS `ued_component_menu_nav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ued_component_menu_nav` (
  `menuId` int(12) NOT NULL COMMENT '菜单id',
  `name` varchar(32) DEFAULT NULL COMMENT '菜单名',
  `label` varchar(32) NOT NULL COMMENT '菜单显示名称',
  `level` int(12) NOT NULL COMMENT '级别',
  `parent` int(12) NOT NULL COMMENT '父级别',
  `orderByNum` int(12) DEFAULT NULL,
  `content` varchar(12) DEFAULT NULL COMMENT 'T-text,D-demo,A-api',
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ued_component_menu_nav`
--

LOCK TABLES `ued_component_menu_nav` WRITE;
/*!40000 ALTER TABLE `ued_component_menu_nav` DISABLE KEYS */;
INSERT INTO `ued_component_menu_nav` VALUES (1,'','工具箱',1,0,4,'DA'),(2,'','手册',1,0,5,'T'),(3,'','概览',1,0,1,'T'),(4,'','组件',1,0,3,'TDA'),(5,'','通用',1,0,2,'T'),(6,'trusted-html','内联HTML片段 ',2,1,0,'DA'),(7,'layout','布局器 ',2,1,0,'DA'),(8,'drag-drop','拖拽 ',2,1,0,'DA'),(9,'data-encapsulation','组件数据封装 ',2,1,0,'DA'),(10,'scrollbar','自定义滚动条 ',2,1,0,'DA'),(11,'popup','视图弹出服务 ',2,1,0,'DA'),(12,'jigsaw','所有API ',2,2,1,'T'),(13,'skill','相关技术 ',2,2,2,'T'),(14,'design-idea','设计思想 ',2,2,3,'T'),(15,'quickstart','新手入门',2,3,1,'T'),(16,'updatelog','更新日志',2,3,2,'T'),(17,'select','下拉选择 Select',2,4,240,'TDA'),(18,'signaling-chart','信令流程图 Signaling Chart',2,4,250,'TDA'),(19,'pagination','分页 Pagination',2,4,180,'TDA'),(20,'list','列表 List',2,4,140,'TDA'),(21,'loading','加载中 Loading',2,4,150,'TDA'),(22,'radio-group','单选框 Radio',2,4,200,'TDA'),(23,'card','卡片 Card',2,4,30,'TDA'),(24,'graph','图表 Graph',2,4,120,'TDA'),(25,'gis','地图 GIS',2,4,110,'TDA'),(26,'checkbox','复选框 Checkbox',2,4,50,'TDA'),(27,'dialog','对话框 Dialog',2,4,80,'TDA'),(28,'tile','平铺 Tile',2,4,330,'TDA'),(29,'switch','开关 Switch',2,4,290,'TDA'),(30,'collapse','折叠 Collapse',2,4,60,'TDA'),(31,'button','按钮 Button',2,4,20,'TDA'),(32,'snackbar','提示框 Snackbar',2,4,270,'TDA'),(33,'tooltip','文字提示 Tooltip',2,4,350,'TDA'),(34,'time','时间点 Time',2,4,210,'TDA'),(35,'range-time','时间范围 Range Time',2,4,220,'TDA'),(36,'tag','标签 Tag',2,4,320,'TDA'),(37,'tree','树 Tree',2,4,360,'TDA'),(38,'steps','步骤条 Steps',2,4,280,'TDA'),(39,'toast','消息 Toast',2,4,340,'TDA'),(40,'slider','滑动条 Slider',2,4,260,'TDA'),(41,'cascade','级联选择 Cascade',2,4,40,'TDA'),(42,'combo-select','组合框 Combo Select',2,4,70,'TDA'),(43,'form','表单 Form',2,4,100,'TDA'),(44,'table','表格 Table',2,4,310,'TDA'),(45,'input','输入框 Input',2,4,130,'TDA'),(46,'progressbar','进度条 Progressbar',2,4,190,'TDA'),(47,'tab','选项卡 Tab',2,4,300,'TDA'),(48,'notice','通告 Notice',2,4,160,'TDA'),(49,'alert','通知对话框 Alert',2,4,10,'TDA'),(50,'notification','通知提醒框 Notification',2,4,170,'TDA'),(51,'fish-bone','鱼骨图 Fish Bone',2,4,90,'TDA'),(52,'unit','单位格式',2,5,7,'T'),(53,'name','命名规则',2,5,5,'T'),(54,'i18n','国际化',2,5,9,'TDA'),(55,'icon','图标',2,5,4,'T'),(56,'basic-colour','基调配色',2,5,1,'T'),(57,'font','字体',2,5,3,'T'),(58,'griad','布局',2,5,2,'T'),(59,'flag','标志',2,5,8,'T'),(60,'version','版权信息',2,5,6,'T');
/*!40000 ALTER TABLE `ued_component_menu_nav` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-28  9:03:32
