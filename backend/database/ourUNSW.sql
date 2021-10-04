-- Database of ourUNSW app
-- Table of data about Students

create table Students (
	student_id      varchar(10),
	name        varchar(30) NOT NULL,
    email       varchar(100) NOT NULL,
    display_name varchar(20) NOT NULL,
    hashed_pwd   varchar(64),
    login_token  varchar(30),
	degree      varchar(70),
	primary key (student_id)
);

INSERT INTO Students values (
    'z5555555', 
    'Lol Clown', 
    'lol@gmail.com', 
    'random', 
    'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082',
    NULL,
    NULL);

INSERT INTO Students values (
    'z5555556', 
    'Adam Spencer', 
    'hi@gmail.com', 
    'apple', 
    'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082',
    '6789dsf',
    'Computer Science') RETURNING student_id;


-- DELETE FROM Students
-- WHERE student_id = 'z5555556';