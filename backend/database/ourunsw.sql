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
    bio             varchar(500),
    timetable_week_1    varchar(30000),
    timetable_week_2    varchar(30000),
    timetable_week_3    varchar(30000),
    timetable_week_4    varchar(30000),
    timetable_week_5    varchar(30000),
    timetable_week_6    varchar(30000),
    timetable_week_7    varchar(30000),
    timetable_week_8    varchar(30000),
    timetable_week_9    varchar(30000),
    timetable_week_10    varchar(30000),
    primary key (email)
);

CREATE TABLE Courses (
    course_id integer,
    course_name varchar(255),
    primary key (course_id)
);

create table Messages (
    message_id          integer,
    message_content        varchar(500),
    message_time            timestamp,
    course_id            integer,
    student_id            varchar(10),
    primary key (message_id)
);
