SET NAMES UTF8;
DROP DATABASE IF EXISTS car;
CREATE DATABASE car CHARSET=UTF8;
USE car;
CREATE TABLE car_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32),
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16),
	avatar VARCHAR(128), #头像、图片路径
	real_name VARCHAR(32), #真实姓名
	sex INT   #性别 0-女   1-男
);
INSERT INTO car_user VALUES(1,"dongdong",123456,"1565991416@qq.com",15768591762,null,"栋栋",1);