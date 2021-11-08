from flask import Flask
from flask_login import LoginManager
from database.register_new_user import register_student
from database.read_db import read_db
from database.validate_entity_exists import validate_entity_exists
from database.update_user import update_user_data
from database.grab_course_members import grabCourseMembers
from database.read_students import read_students_data
from database.read_task import read_task_data
from database.read_task_mark import read_task_mark_data
from database.update_task_mark import update_task_data
from database.insert_new_mark import insert_mark
from database.messages.insert_message import insert_message
from database.messages.read_message_table import get_student_id_from_email, get_course_id_from_course_name, get_message_list_by_course_id

import time
import datetime
import argon2
from argon2 import PasswordHasher
from error import InputError, LogoutError
import uuid
import M2Crypto
import re
import jwt
    # '''
    # Backend system that is responsible for processing data from, and transimitting data between front end and database
    # '''


class Systems:
    # def __init__(self):

    # '''
    # Login Services - Given a registered users' email and password and returns a new `token` for that session.

    # Arguments:
    #     email (string) - a string that connects a user to a messaging network
    #     password (string) - a string of characters that grants access to a permitted user

    # Exceptions:
    #     InputError  - occurs when email entered is not a valid email
    #                 - email entered does not belong to a user
    #                 - password is not correct

    # Return Value:
    #     - returns login token
    #     - returns email of the user
    # '''

    # helper functions for register
    @classmethod
    def password_format_check(self, password):
        # calculating the length
        length_error = len(password) < 6

        # searching for digits
        digit_error = re.search(r"\d", password) is None

        # searching for uppercase
        uppercase_error = re.search(r"[A-Z]", password) is None

        # searching for lowercase
        lowercase_error = re.search(r"[a-z]", password) is None

        # overall result
        password_ok = not (
            length_error or digit_error or uppercase_error or lowercase_error)

        return password_ok

    # generate a random number using m2crypto library, which is used to generate an unique session id using uuid library
    def new_session_id(self):
        num_bytes = 16
        session_id = uuid.UUID(bytes=M2Crypto.m2.rand_bytes(num_bytes))
        return str(session_id)

    # logout and helper functions
    def logout(self, token):
        '''
        Validate a given token. If valid, delete the token from database to indicate that the user has logged out

        Arguments:
            token (string) - a randomly generated code that adds extra security for users

        Return Value:
            - returns True
        '''
        email = self.validate_token(token)
        update_user_data('login_token', '', 'email', email)

        is_success = True
        return {'is_success': is_success, }

    def validate_token(self, token):
        '''
        Validate a token

        Arguments:
            token - strings

        Exceptions:
            LogoutError - Occurs when:
                - token cannot be decoded by jwt module
                - token is not in the correct format of {"session_id": session_id, "email": email}
                - user with the email specified in the token does not exist
                - token is different from token recorded in the database upon login

        Return Value:
            - returns email of the user owning the token
        '''
        try:
            decoded = jwt.decode(token, "thisisakey", algorithms=["HS256"])

            for key, value in decoded.items():

                if key == 'email':
                    recorded_token = validate_entity_exists(
                        'login_token', 'email', value)
                    if recorded_token is None:
                        raise LogoutError('User does not exist')
                    if token != recorded_token:
                        recorded_decoded = jwt.decode(
                            recorded_token, "thisisakey", algorithms=["HS256"])

                        raise LogoutError(
                            'Wrong login token. You are a hacker!!!')
                    return value
            raise LogoutError('Invalid token')

        except (Exception, jwt.exceptions.InvalidTokenError) as error:
            raise error

    # Logs an user in
    def auth_login(self, email, password):
        # check if email is in the correct format
        if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", email):
            raise InputError('Email not in correct format')

        # check if user exists, if not then raise error
        if validate_entity_exists('*', 'email', email) is None:
            raise InputError('User does not exist')

        # grab hash from database
        correct_pwd = validate_entity_exists('hashed_pwd', 'email', email)
        ph = PasswordHasher()
        try:
            ph.verify(correct_pwd, password)
            # generate token
            session_id = self.new_session_id()
            token = jwt.encode(
                {"session_id": session_id, "email": email}, "thisisakey", algorithm="HS256")
            token = str(token)
            token = token[2:-1]
            # update database that user has logged in
            update_user_data('login_token', 'email', token, email)

            # grab courses from database and return to front end
            db_courses = validate_entity_exists('course', 'email', email)
            courses = {}
            courses["courses"] = db_courses.split(",")

            return {"token": token, "courses": courses, }
        except argon2.exceptions.VerifyMismatchError:
            raise InputError('Username or password is incorrect.')

    def register(self, username, password, reentered_password, email):
        # '''
        # Creates a new account for a user and returns a token.

        # Arguments:
        #     username, password, email - strings

        # Exceptions:
        #     InputError - Occurs when:
        #         - username is not between 1 and 20 characters inclusive in length
        #         - email entered is not in the format of email@something.com
        #         - email address is already being used by another user
        #         - password entered is less than 6 characters long
        #         - password entered does not contain at least 1 upper case character, 1 lower case character and 1 digit
        #         - username, password and email are sanitised by psycopg2 library when inserting input into database

        # Return Value:
        #     - returns token
        #     - returns email
        # '''

        # all the checks
        if len(username) not in range(1, 21):
            raise InputError(
                'Username should be 1 to 20 characters inclusive in length')

        if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", email):
            raise InputError('Email not in correct format')

        if validate_entity_exists('*', 'email', email) is not None:
            raise InputError('User already exists')

        if validate_entity_exists('*', 'display_name', username) is not None:
            raise InputError('Username already exists')

        if not self.password_format_check(password):
            raise InputError(
                'Password entered must be more than 6 characters, and contain at least 1 upper case character, 1 lower case character and 1 digit')

        if password != reentered_password:
            raise InputError('Passwords do not match')

        # hash the password
        ph = PasswordHasher()
        try:
            hashed_pwd = ph.hash(password)
        except argon2.exceptions.HashingError as error:
            raise InputError('Invalid password (hashing failed)')

        # generate token
        session_id = self.new_session_id()
        token = jwt.encode(
            {"session_id": session_id, "email": email}, "thisisakey", algorithm="HS256")
        token = str(token)
        token = token[2:-1]

        print("stored token: " + token)
        # token = jwt.encode({session_id,"email": email}, "thisisakey", algorithm="HS256")

        # store into database
        register_student('', '', email, username, hashed_pwd, token, '', '')

        # is_success = True
        # return {'is_success': is_success,}
        return {"token": token}

    def timetables(self, email):
        # '''
        # Return all timetables of an user

        # Arguments:
        #     email - string

        # Return Value:
        #     - returns dictionary including fields of timetable
        # '''

        # Grab timetables from database and put them into a list
        timetables = []
        fixed = 'timetable_week_'
        for i in range(10):
            var = str(i+1)
            col_name = fixed + var
            table = validate_entity_exists(col_name, 'email', email)
            timetables.append(table)
        return {"timetables": timetables, }
    
    def profile(self, email):
        # '''
        # Return all timetables of an user

        # Arguments:
        #     email - string

        # Return Value:
        #     - returns dictionary including fields of user info except timetables
        # '''
        

        # Grab info from database
        result = read_students_data('email', email)
        zid = result[0][1]
        real_name = result[0][2]
        username = result[0][3]
        degree = result[0][4]
        courses = result[0][5]
        bio = result[0][6]
        if result[0][7] is None:
            timetable_publicity = 0
        else:
            timetable_publicity = result[0][7]
        avatar = bytes(result[0][8])
        courses = courses.replace(",", ", ")
       
        return {"username": username, "real_name": real_name, \
            "zid": zid, "degree": degree, \
            "bio": bio, "courses": courses, \
            "timetable_publicity": timetable_publicity, "avatar": avatar.decode("utf-8"), }

    def message_send(self, token, course, message):
        # '''
        # Return all information of an user

        # Arguments:
        #     token - string
        #     course - course code e.g. COMP3900
        #     message - string

        # Exceptions:
        #     InputError - Occurs when:
        #         - message is not between 1 to 500 characters in length

        # Return Value:
        #     - Don't return
        # '''
        if len(message) not in range(1, 501):
            raise InputError(
                'Message has to be 1 to 500 characters inclusive in length')

        email = self.validate_token(token)
        zid = get_student_id_from_email(email)

        course_id = get_course_id_from_course_name(course)

        insert_message(message, course_id, zid)

    def message_list_all(self, token, course):

        # '''
        # Return all information of an user

        # Arguments:
        #     token - string
        #     course - course code e.g. COMP3900
        
        # Exceptions:
        #   None
        
        # Return Value:
        #     - A list of dictionaries. E.g. [{'message_content': 'a', 'sender': 'me', 'message_time': '10/22/2021, 13:21:18', 'currrent_user': True}, 
        #                                       {'message_content': 'b', 'sender': 'you', 'message_time': '10/22/2021, 13:22:18', 'currrent_user': False}]
        # '''
       
        email = self.validate_token(token)

        course_id = get_course_id_from_course_name(course)

        messages = get_message_list_by_course_id(course_id)

        # Convert the list of tuple returned by database to a list of dictionaries
        num_messages = len(messages)
        altered_message = []
        zid = get_student_id_from_email(email)
        if num_messages > 0:
            # check if messages are sent by current user, if yes then set field "current_user" to true otherwise to false
            for x in range(0, num_messages):
                new = {}
                new['message'] = messages[x][1]
                username = validate_entity_exists('display_name', 'student_id', messages[x][3])
                new['name'] = username
                new['timestamp'] = messages[x][2].strftime("%m/%d/%Y, %H:%M:%S")
                if messages[x][3] == zid:
                    new['is_current_user'] = True
                else:
                    new['is_current_user'] = False
                altered_message.append(new)
        return altered_message

    def members_list(self, token, course):
        # '''
        # Return all information of an user

        # Arguments:
        #     token - string
        #     course - course code e.g. COMP3900
        
        # Exceptions:
        #   None
        
        # Return Value:
        #     - A list of members. E.g. 
        # 
       
        email = self.validate_token(token)

        # course_id = get_course_id_from_course_name(course)

        members = grabCourseMembers(course)
        return members

    def search(self, username):
        result = read_students_data('display_name', username)

        # Convert the list of tuple returned by database to a list of dictionaries
        num_users = len(result)
        users_list = []
        if num_users > 0:
            # check if messages are sent by current user, if yes then set field "current_user" to true otherwise to false
            for x in range(0, num_users):
                new = {}
                new['email'] = result[x][0]
                new['name'] = result[x][2]
                new['display_name'] = result[x][3]
                users_list.append(new)
        return users_list
        
    def assessment_mark(self, course_name):
        course_id = get_course_id_from_course_name(course_name)
        result = read_task_data('course_id', course_id)
        num_assessments = len(result)
        assessments = []
        if num_assessments > 0:
            # put assessment info into a list of dictionary, each dictionary represents info of a particular assessment
            for x in range(0, num_assessments):
                new = {}
                new['name'] = result[x][1]
                new['weighting'] = result[x][2]
                new['hurdle'] = result[x][3]
                new['hurdle_mark'] = result[x][4]
                assessments.append(new)
        return assessments

    def marks(self, email, course_name):
        result = read_students_data('email', email)
        zid = result[0][1]
        course_id = get_course_id_from_course_name(course_name)
        mark_result = read_task_mark_data('student_id', zid, 'course_id', course_id, '1', 1)
        num_assessments = len(mark_result)
        assessments = []
        if num_assessments > 0:
            # put assessment info into a list of dictionary, each dictionary represents info of a particular assessment
            for x in range(0, num_assessments):
                new = {}
                new['mark'] = result[x][1]
                task = result[x][2]
                task_data = read_task_data('task_id', task)
                task_name = task_data[0][1]
                new['task'] = task_name
                assessments.append(new)
        return assessments
    
    def updatemarks(self, email, course_name, tasks, marks):
        result = read_students_data('email', email)
        zid = result[0][1]
        course_id = get_course_id_from_course_name(course_name)
        task_list = tasks.split(", ")
        mark_list = marks.split(", ")
        
        num_assessments = len(task_list)
        num_marks = len(mark_list)
        if num_assessments != num_marks:
            raise InputError('Number of assessments and marks do not match!')
        for x in range(0, num_assessments):
            task_info = read_task_data('task', task_list[x])
            task_id = task_info[0][0]
            task_mark_info = read_task_mark_data('student_id', zid, 'course_id', course_id, 'task_id', task_id)
            if len(task_mark_info) == 0:
                insert_mark(mark_list[x], task_id, zid, course_id)
            else:
                update_task_data('mark', mark_list[x], 'task_id', task_id, 'student_id', zid, 'course_id', course_id)

# var =  Systems()

# For future unit test
# print(var.register('pikachu', '123123aA!2', '123123aA!2', 'email@mail.com'))  # First user registeration - (PASS)
# print(var.register('pikachu', '123123aA!2', '123123aA!2', 'email@mail.com')) # Duplicate check (User already exists) - (PASS)
# print(var.register('new_pika', '123123aA!2', '123123aA!3', 'email2@mail.com')) # wrong password re-enter - (PASS)
# print(var.register('new_pika', '123123aA!2', '123123aA!2', 'email2@mail.com2')) # email wrong format check - (PASS)
# print(var.register('new_pika', '123123a!2', '123123a!2', 'email2@mail.com')) # password wrong format check - (PASS)
# print(var.register('pikachu', '123123aA!2', '123123aA!2', 'email3@mail.com')) # same username but different email check, registration should be successful - (PASS)


# register(username, password, reentered_password, email)

# currently register func works, 

# need to test login/logout and all the src_server.py