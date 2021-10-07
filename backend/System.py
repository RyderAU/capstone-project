# from User import Provider, Patient, Appointment
# from Centre import Centres
from flask import Flask
from flask_login import LoginManager
from database.register_new_user import register_student
from database.read_db import read
from argon2 import PasswordHasher

import re
import jwt

# from error import BookingError
# from write_to_csv import *
# import datetime

import copy

def valid_time(time):
    return time > 0

class System:
    def __init__(self):
        # self._centres = []
        # self._patients = []
        # self._providers = []
        # self._appointments = []

    '''
    Login Services - Given a registered users' email and password and returns a new `token` for that session.

    Arguments:
        email (string) - a string that connects a user to a messaging network
        password (string) - a string of characters that grants access to a permitted user

    Exceptions:
        InputError  - occurs when email entered is not a valid email
                    - email entered does not belong to a user
                    - password is not correct

    Return Value:
        - returns token on user is registered
        - returns auth_user_id  on user is registered
    '''

# Logs an user in
    def auth_login(email, password):
        #  sanitise input
        sanitise_input(email)

        # check if email is in the correct format
        if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", email):
            raise InputError('Email not in correct format')
        
        # check if user exists, if not then raise error
        if not validate_entity_exists(email):
            raise InputError('User does not exist')

        # grab hash from database
        query = "select password from students where email=" + email
        result = read(query)
        ph = PasswordHasher()
        try:
            ph.verify(result, password)
        except argon2.exceptions.VerifyMismatchError:
            raise FailedLoginError('Username or password is incorrect.')
        finally:
            # generate token
            session_id = new_session_id()
            token = jwt.encode({"session_id": session_id, "email": email}, "thisisakey", algorithm="HS256")
            return {"token" : token, "email" : email}

    def validate_entity_exists(email):
        # read from database
        query = "select * from students where email=" + email
        result = read(query)
        return False if result is None else True

    def register(self, username, password, email):
        '''
        Creates a new account for a user and returns a token.

        Arguments:
            username, password, email - strings

        Exceptions:
            InputError - Occurs when:
                - username is not between 1 and 30 characters inclusive in length
                - username contains illegal characters such as '";<lol/>../--#`ls` (or just sanitise?)
                - email entered is not in the format of email@something.com
                - email address is already being used by another user
                - email contains illegal characters
                - password entered is less than 6 characters long
                - password entered does not contain at least 1 upper case character, 1 lower case character and 1 digit
                - password entered contains illegal characters (?)

        Return Value:
            - returns token
            - returns auth_user_id 
        '''

        # all the checks
        register_info = {}
        for variable in ["username", "password", "email"]:
            register_info[variable] = eval(variable)

        for attribute, value in register_info.items():
            sanitise_input(attribute, value)

        if len(username) not in range(1, 31):
            raise InputError('Username should be 1 to 30 characters inclusive in length')
        
        if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", email):
            raise InputError('Email not in correct format')

        if validate_entity_exists(email):
            raise InputError('User already exists')

        if validate_entity_exists(username):
            raise InputError('Username already exists')

        if len(password) < 6:
            raise InputError('Password too short, please try again!')
        
        if not password_format_check(password):
            raise InputError('Password entered must contain at least 1 upper case character, 1 lower case character and 1 digit')

        # hash the password
        ph = PasswordHasher()
        hashed_pwd = ph.hash(password)
        # generate token
        session_id = new_session_id()
        token = jwt.encode({"session_id": session_id, "email": email}, "thisisakey", algorithm="HS256")
        # store into database
        register_student('', '', email, username, hashed_pwd, token, '')

        return {"token" : token, "email" : email}

# helper functions to-do
    def password_format_check(password):

    def new_session_id():
        
    def sanitise_input('email', email):
        sanitise library to do


# to do
    def logout(token: str) -> dict:
        '''
        Inactivates a given token, ending a users session.

        Arguments:
            token (string) - a randomly generated code that adds extra security for users

        Return Value:
            - returns {boolean} on condition <is success>
        '''
        validate_token(token)
        session_id = token_to_session_id(token)
        auth_user_id = session_id_to_auth_id(session_id)

        remove_from_list_in_entity('user', auth_user_id, 'session_ids', session_id)
        
        return {'is_success': True}

        
    '''
    Personal Information Services
    '''
    @property
    def patients(self):
        return self._patients

    def rewrite_patt_csv(self):
        remove_patt_csv()
        new_patt_csv()
        for patt in self._patients:
            record_patient(patt.name, patt.email, patt.password, patt.phone, patt.medicare_num)

    def rewrite_prov_csv(self):
        remove_prov_csv()
        new_prov_csv()
        for prov in self._providers:
            record_provider(prov.name, prov.email, prov.profession, prov.password, prov.phone, prov.num)

    def rewrite_prov_rate_csv(self):
        remove_prov_rate_csv()
        patt_list = []
        for patt in self._patients:
            patt_list.append(patt.email)

        new_prov_rate_csv(patt_list)
        for prov in self._providers:
            record_prov_rate(prov, patt_list)

    def rewrite_ctr_rate_csv(self):
        remove_ctr_rate_csv()
        patt_list = []
        for patt in self._patients:
            patt_list.append(patt.email)

        new_ctr_rate_csv(patt_list)
        for ctr in self._centres:
            record_ctr_rate(ctr, patt_list)
