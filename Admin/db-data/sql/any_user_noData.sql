-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2019 年 11 月 27 日 13:47
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `any_shop_mall`
--

-- --------------------------------------------------------

--
-- 表的结构 `any_user`
--

CREATE TABLE IF NOT EXISTS `any_user` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `uid` varchar(128) NOT NULL DEFAULT '' COMMENT 'uid',
  `mobile` varchar(15) NOT NULL DEFAULT '' COMMENT '手机号码',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '头像',
  `email` varchar(32) NOT NULL DEFAULT '' COMMENT '邮箱',
  `nick_name` varchar(100) NOT NULL DEFAULT '' COMMENT '昵称',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '真实性别',
  `id_card` varchar(32) NOT NULL DEFAULT '' COMMENT '身份证号码',
  `sex` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '性别 0:保密 1:男 2:女',
  `both_date` varchar(15) NOT NULL DEFAULT '0' COMMENT '出生日期',
  `address` varchar(100) NOT NULL DEFAULT '' COMMENT '地址区域',
  `address_detail` varchar(100) NOT NULL DEFAULT '' COMMENT '地址详情',
  `qm` varchar(255) NOT NULL DEFAULT '' COMMENT '签名',
  `status` int(5) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=10000;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
