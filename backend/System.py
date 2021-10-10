from flask import Flask
from flask_login import LoginManager
from register_new_user import register_student
from read_db import read_db
from validate_entity_exists import validate_entity_exists
from update_user import update_user_data
import argon2
from argon2 import PasswordHasher
from error import *
import uuid, M2Crypto
import re
import jwt
# '''
    # Backend system that is responsible for processing data from, and transimitting data between front end and database
    # '''
class System:
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
        password_ok = not (length_error or digit_error or uppercase_error or lowercase_error)

        return password_ok

# generate a random number using m2crypto library, which is used to generate an unique session id using uuid library
    def new_session_id(self):
        num_bytes = 16
        session_id = uuid.UUID(bytes = M2Crypto.m2.rand_bytes(num_bytes))
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
        email = validate_token(token)
        update_user_data('login_token', '', 'email', email)
        
        is_success = True
        return {'is_success': is_success,}

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
                    recorded_token = validate_entity_exists('login_token', 'email', value)
                    if recorded_token is None:
                        raise LogoutError('User does not exist')
                    if token != recorded_token:
                        raise LogoutError('Wrong login token. You are a hacker!!!')
                    return value
                else:
                    # When there is no email field in the login token
                    raise LogoutError('Invalid token')
        except (Exception, jwt.exceptions.InvalidTokenError) as error:
            raise LogoutError('Invalid token')




# Logs an user in
    @classmethod
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
            token = jwt.encode({"session_id": session_id, "email": email}, "thisisakey", algorithm="HS256")

            # update database that user has logged in
            update_user_data('login_token', token, 'email', email)
            return {"token" : token}
        except argon2.exceptions.VerifyMismatchError:
            raise InputError('Username or password is incorrect.')
            
    def register(self, username, password, reentered_password, email):
        # '''
        # Creates a new account for a user and returns a token.

        # Arguments:
        #     username, password, email - strings

        # Exceptions:
        #     InputError - Occurs when:
        #         - username is not between 1 and 30 characters inclusive in length
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
        if len(username) not in range(1, 31):
            raise InputError('Username should be 1 to 30 characters inclusive in length')
        
        if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", email):
            raise InputError('Email not in correct format')

        if validate_entity_exists('*', 'email', email) is not None:
            raise InputError('User already exists')

        if validate_entity_exists('*', 'display_name', username) is not None:
            raise InputError('Username already exists')
        
        if not self.password_format_check(password):
            raise InputError('Password entered must be more than 6 characters, and contain at least 1 upper case character, 1 lower case character and 1 digit')

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
        token = jwt.encode({"session_id": session_id, "email": email}, "thisisakey", algorithm="HS256")


        # store into database
        register_student('', '', email, username, hashed_pwd, token, '')

        # is_success = True
        # return {'is_success': is_success,}
        return {"token" : token}



var =  System()
# print(var.register('pikachu', '123123aA!2', '123123aA!2', 'email@mail.com'))  # First user registeration - (PASS)
# print(var.register('pikachu', '123123aA!2', '123123aA!2', 'email@mail.com')) # Duplicate check (User already exists) - (PASS)
# print(var.register('new_pika', '123123aA!2', '123123aA!3', 'email2@mail.com')) # wrong password re-enter - (PASS)
# print(var.register('new_pika', '123123aA!2', '123123aA!2', 'email2@mail.com2')) # email wrong format check - (PASS)
# print(var.register('new_pika', '123123a!2', '123123a!2', 'email2@mail.com')) # password wrong format check - (PASS)


# register(username, password, reentered_password, email)