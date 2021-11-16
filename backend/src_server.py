'''
Description: All the routes for the server are contained here

Created by: Helena Ling and Sandeep Das
'''
import sys

from database.read_courses import read_courses_data
from json import dumps
from flask import Flask, request, send_from_directory
from flask_cors import CORS

from database.register_new_user import register_student
from database.read_db import read_db
from database.validate_entity_exists import validate_entity_exists
from database.update_user import update_user_data
from courseGrabber import grabCourseIDs
# from System import *
from System import Systems
# from System import auth_login, logout, register, validate_token
from error import InputError, LogoutError

def default_handler(err):
    '''Handles errors'''
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__)
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, default_handler)

system = Systems()

#------------------------------------------------------------------------------#
#                                routes: auth                                  #
#------------------------------------------------------------------------------#

@APP.route("/login", methods=['POST'])
def auth_login_route():
    ''' Authenticates email / password and returns id / token '''
    email = request.get_json()['email']
    password = request.get_json()['password']

    courses_and_token = system.auth_login(email, password)
    return dumps(courses_and_token)

@APP.route("/logout", methods=['POST'])
def auth_logout_route():
    ''' Logs user out when given a valid token '''
    token = request.get_json()['token']
    is_success = system.logout(token)

    return dumps(is_success)

@APP.route("/signup", methods=['POST'])
def auth_register_route():
    ''' Creates an account given details and returns id / token '''
    email = request.get_json()['email']
    password = request.get_json()['password']
    passwordConfirm = request.get_json()['passwordConfirm']
    displayName = request.get_json()['displayName']

    email_and_token = system.register(displayName, password, passwordConfirm, email)

    #email_and_token = {'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uX2lkIjoiNTcwMmM0ODUtYTk4MS1mMDVjLTUzYWItOGM1YjNkZGM1NWEzIiwiZW1haWwiOiJoaW5hdGFAbWFpbC5jb20ifQ.OlQSohVVHrPfdDLFTO3B6umSnEf9AjDO119S2QLVqEA'}

    return dumps(email_and_token)

#------------------------------------------------------------------------------#
#                              routes: myUNSW link                             #
#------------------------------------------------------------------------------#

@APP.route("/linking", methods=['POST'])
def linking_route():
    email = request.get_json()['email']
    password = request.get_json()['password']
    token = request.get_json()['token']

    try:
        # Grab user relevant details using selenium library
        userDetails = grabCourseIDs(email, password)

        # Prepare to store in database the string "course1,course2,course3"
        courses = userDetails.get("courses")
        db_courses = ",".join(courses)

        # Insert into the database
        personal_email = system.validate_token(token)
        update_user_data('student_id', 'email', userDetails.get("zID"), personal_email)
        update_user_data('degree', 'email', userDetails.get("degree"), personal_email)
        update_user_data('name', 'email', userDetails.get("name"), personal_email)
        update_user_data('course', 'email', db_courses, personal_email)
        update_user_data('login_token', 'email', '', personal_email)

        timetables = userDetails.get("timetables")
        fixed = 'timetable_week_'
        for i in range(10):
            var = str(i+1)
            col_name = fixed + var
            
            update_user_data(col_name, 'email', timetables[i].replace("%", "%%"), personal_email)


        # For frontend
        is_success = True
        return dumps({'is_success': is_success,})
    except Exception as e:
        # Error in selenium or error in inserting into database
        raise e
        # raise InputError('Unable to link to myUNSW. Please check your credentials again')


#------------------------------------------------------------------------------#
#                              routes: profile                                 #
#------------------------------------------------------------------------------#

@APP.route("/dashboard/timetable", methods=['GET'])
def user_timetable_flask():
    '''returns timetables of a user'''

    token = request.args.get("token")
    
    try:
        # Grab data from the database
        email = system.validate_token(token)
        timetables = system.timetables(email)
        
        return dumps(timetables)
    except Exception as e:
        # Error in selenium or error in inserting into database
        raise e

@APP.route("/dashboard/profile", methods=['GET'])
def user_profile_flask():
    '''returns information of a user'''

    token = request.args.get('token')
    try:
        # Grab data from the database
        email = system.validate_token(token)
        info = system.profile(email)
        
        return dumps(info)
    except Exception as e:
        # Error in selenium or error in inserting into database
        raise e


@APP.route("/dashboard/profile", methods=['POST'])
def user_profile_setbio_flask():
    '''returns an empty dictionary'''

    token = request.get_json()['token']
    bio = request.get_json()['bio']
    name = request.get_json()['display_name']
    timetable_publicity = request.get_json()['timetable_publicity']
    avatar = request.get_json()['avatar']

    if bio is not None:
        if len(bio) not in range(1, 501):
            raise InputError('Bio should be between 1 and 500 characters inclusive')
            
        try:
            # Insert into the database
            email = system.validate_token(token)
            update_user_data('bio', 'email', bio, email)
            # success = True
        except Exception as e:
            # Error in selenium or error in inserting into database
            raise e
    if name is not None:
        if len(name) not in range(1, 21):
            raise InputError('Username should be between 1 and 20 characters inclusive')
        try:
            # Insert into the database
            email = system.validate_token(token)
            update_user_data('display_name', 'email', name, email)
            # success = True
        except Exception as e:
            # Error in selenium or error in inserting into database
            raise e
    if timetable_publicity is not None:
        try:
            # Insert into the database
            email = system.validate_token(token)
            if timetable_publicity != 1 and timetable_publicity != 0:
                raise InputError('Timetable publicity should be 1 or 0')
            update_user_data('timetable_publicity', 'email', timetable_publicity, email)
            # success = True
        except Exception as e:
            # Error in selenium or error in inserting into database
            raise e
    if avatar is not None:
        try:
            # Insert into the database
            email = system.validate_token(token)
            update_user_data('avatar', 'email', avatar, email)
            # success = True
        except Exception as e:
            # Error in selenium or error in inserting into database
            raise e
    return dumps({'bio': bio, \
        'display_name': name, \
        'timetable_publicity': timetable_publicity, \
        'avatar': avatar, })

# #------------------------------------------------------------------------------#
# #                              routes: message                                 #
# #------------------------------------------------------------------------------#

@APP.route("/message/send", methods=['POST'])
def message_send_route():
    '''Sends a message'''
    token = request.get_json()['token']
    course = request.get_json()['course_name']
    
    message = request.get_json()['message']

    system.message_send(token, course, message)
    return dumps({'is_success': True,})

@APP.route("/message/listall", methods=['GET'])
def message_list_all():
    '''Read all messages in the chat'''
    token = request.args.get('token')
    course = request.args.get('course_name')

    messages = system.message_list_all(token, course)
    return dumps({'course_messages': messages,})

@APP.route("/channel/members", methods=['GET'])
def channel_members():
    '''Get the list of members in a course group chat'''
    token = request.args.get('token')
    course = request.args.get('course_name')

    members = system.members_list(token, course)
    return dumps({'member_details': members, })


# #------------------------------------------------------------------------------#
# #                     routes: search and view others' profile                  #
# #------------------------------------------------------------------------------#

@APP.route("/search", methods=['GET'])
def search_route():
    ''' Searches for users by username '''
    display_name = request.args.get('display_name')

    user_list = system.search(display_name)
    return dumps({'result': user_list,})

@APP.route("/profile", methods=['GET'])
def other_users_profile():
    '''returns information of other users'''

    email = request.args.get('email')
    try:
        # Grab data from the database
        info = system.profile(email)
        publicity = info.get("timetable_publicity")
        if publicity == 1:
            timetables = system.timetables(email)
            info['timetables'] = timetables
        else:
            info['timetables'] = []
        return dumps(info)
    except Exception as e:
        # Error in selenium or error in inserting into database
        raise e

# #------------------------------------------------------------------------------#
# #                     routes: course outline and mark calculation              #
# #------------------------------------------------------------------------------#

@APP.route("/markcalc", methods=['GET'])
def markcalc():
    '''returns assessment components of a particular course, and marks for all assessments of a particular course for the current user'''

    token = request.args.get('token')
    course_name = request.args.get('course_name')
    try:
        # Grab data from the database
        email = system.validate_token(token)
        assessments = system.assessment_mark(email, course_name)
        return dumps({'assessments': assessments, })
    except Exception as e:
        # Error in selenium or error in inserting into database
        raise e

@APP.route("/markcalc", methods=['POST'])
def update_mark():
    '''returns marks for all assessments of a particular course for the current user'''

    token = request.get_json()['token']
    course = request.get_json()['course']

    task = request.get_json()['tasks']
    mark = request.get_json()['marks']
    
    try:
        # Update mark
        email = system.validate_token(token)
        system.updatemarks(email, course, task, mark)

        # For frontend
        is_success = True
        return dumps({'is_success': is_success,})
    except Exception as e:
        # Error in selenium or error in inserting into database
        raise e

#------------------------------------------------------------------------------#
#                          routes: workspace/reset                             #
#------------------------------------------------------------------------------#

if __name__ == "__main__":
    APP.run(port=(3030), debug=True)