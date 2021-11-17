-- Database of ourUNSW app

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
   timetable_publicity integer,
   avatar bytea,
   primary key (email)
);


create table Messages (
	message_id          integer,
	message_content		varchar(500),
	message_time		timestamp,
	course_id			integer,
	student_id			varchar(10),
	primary key (message_id)
);


CREATE TABLE Courses (
    course_id integer,
    course_name varchar(255),
    primary key (course_id)
);

INSERT INTO courses(course_id, course_name)
VALUES (1,  'COMP4920'),
       (2,  'COMP3900'),
       (3,  'COMP3311'),
       (4,	'TABL3757'),
       (5,	'COMP4418'),
       (6,  'COMP9444'),
       (7,  'COMP2511'),
       (8,  'FINS2624');

CREATE TABLE Task (
    task_id integer PRIMARY KEY,
    task varchar(100),
    deadline varchar(500),
    weighting varchar(10),
    hurdle integer,
    hurdle_mark varchar(10),
    course_id integer
);

INSERT INTO Task(task_id, task, deadline, weighting, hurdle, hurdle_mark, course_id)
VALUES (1,'Seminar Participation', 'Weeks 1-5,7-10', 10, 0, -1, 1),
	   (2,'Lecture Summaries', 'Week 3, 4, 7, 8' ,10, 0, -1, 1),
	   (3,'Movie Review', 'Week 5', 20, 0, -1, 1),
	   (4,'Student Seminar', 'Week 7-10', 20, 0, -1, 1),
	   (5,'Company Case Study', 'Week 10', 40, 1, 40, 1),
              (6,'Proposal', 'Week 4', 10, 0, -1, 2),
	   (7,'Progressive Demo A', 'Week 5', 2.5, 0, -1, 2),
	   (8,'Retrospective A', 'Week 7',  2.5, 0, -1, 2),
	   (9,'Progressive Demo B', 'Week 8', 2.5, 0, -1, 2),
	   (10,'Retrospective B', 'Week 9', 2.5, 0, -1, 2),
	   (11,'Final Project Demo', 'Week 10', 20, 0, -1, 2),
	   (12,'Project Report', 'Week 10', 20, 0, -1, 2),
	   (13,'Software Quality', 'Week 10', 20, 0, -1, 2),
	   (14,'Participation & Peer Assessment', 'Week 10', 20, 0, -1, 2),
   (15,'Quizzes', 'Weeks 2,3,4,7,8,9', 15, 0, -1, 3),	
	   (16,'Assignment 1', 'Week 5', 15, 0, -1, 3),
	   (17,'Assignment 2', 'Week 9', 20, 0, -1, 3),
	   (18,'Final Exam', 'Exam Period', 50, 1, 40, 3),
   (19,'Real World Case Study Paper', 'Week 10',  20, 0, -1, 4),
	   (20,'Real World Case Study Presentation', 'Week 10',  10, 0, -1, 4),
	   (21,'Reports of Simulation Games', 'Week 3, 7', 30, 0, -1, 4),
	   (22,'Final Examination', 'Exam Period', 40, 0, -1, 4),
   (23,'Assignment 1', 'Week 5', 15, 0, -1, 5),
	   (24,'Assignment 2', 'Week 8', 15, 0, -1, 5),
	   (25,'Assignment 3', 'Week 11', 15, 0, -1, 5),
	   (26,'Final Exam', 'Exam Period', 55, 0, -1, 5),
(27, 'Assignment 1',  'Not Specified In Outline', 30, 0, -1, 6),
(28, 'Assignment 2',  'Not Specified In Outline', 30, 0, -1, 6),
(29, 'Final Exam', 'Exam Period', 40, 0, -1, 6),
	   (30,'Assignment', 'Week 4', 15, 0, -1, 7),
   (31,'Project: Milestones 1 + 2', 'Week 8', 17.5, 0, -1, 7),
   (32,'Project: Milestones 3', 'Week 10', 17.5, 0, -1, 7),
    (33,'Class Mark (Tutorials + Labs)', 'Week 10', 10, 0, -1, 7),
   (34,'Final Exam',  'Exam Period', 40, 1, 40, 7),
  (35,'Weekly problem sets',  'Weeks 2-9', 7, 0, -1, 8),
  (36,'Online Quiz',  'Week 5', 20, 0, -1, 8),
  (37,'Quizzes and exercises',  'Week 2,3,7,9', 13, 0, -1, 8),
  (38,'iLab',  'Week 5 and 9',10, 0, -1, 8),
   (39,'Final Exam',  'Exam Period', 50, 0, -1, 8);



CREATE TABLE Task_Mark(
    task_mark_id integer PRIMARY KEY,
    mark varchar(10),
    task_id integer,
    student_id varchar(10),
    course_id integer
);

