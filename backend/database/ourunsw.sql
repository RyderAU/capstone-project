-- Database of ourUNSW app
-- Table of data about Students

create table Students (
	email           varchar(100) NOT NULL,
    student_id      varchar(10),
	name            varchar(30),
    display_name    varchar(20) NOT NULL,
    hashed_pwd      varchar(500) NOT NULL,
    login_token     varchar(500),
	degree          varchar(70),
    course          varchar(500),
	primary key (email)
);
-- ALTER TABLE Students ALTER COLUMN hashed_pwd VARCHAR(500);
-- INSERT INTO Students values (
--     'z5555555', 
--     'Lol Clown', 
--     'lol@gmail.com', 
--     'random', 
--     'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082',
--     NULL,
--     NULL);

-- INSERT INTO Students values (
--     'z5555556', 
--     'Adam Spencer', 
--     'hi@gmail.com', 
--     'apple', 
--     'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082',
--     '6789dsf',
--     'Computer Science') RETURNING student_id;


-- DELETE FROM Students
-- WHERE student_id = 'z5555556';