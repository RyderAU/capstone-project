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
