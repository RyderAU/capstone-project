-- Database of ourUNSW app
-- Table of data about Students

create table Students (
	userid      varchar(10),
	name        varchar(30) NOT NULL,
    email       varchar(100) NOT NULL,
    displayName varchar(20) NOT NULL,
    hashedPwd   varchar(64),
	degree      varchar(70),
	primary key (userid)
);

-- INSERT INTO Students values (
--     'testu', 
--     'Lol Clown', 
--     'lol@gmail.com', 
--     'random', 
--     'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082',
--     NULL);

-- INSERT INTO Students values (
--     'adsp123', 
--     'Adam Spencer', 
--     'hi@gmail.com', 
--     'apple', 
--     'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082',
--     'Computer Science');

