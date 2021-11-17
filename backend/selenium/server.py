'''
This file is used for testing

Description: All the routes for the server are contained here

Created by: Haesandeep Dashim (Sandeep & Haesun)
'''c
import sys
from json import dumps
import time
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from courseGrabber import grabCourseIDs

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

#------------------------------------------------------------------------------#
#                                routes: auth                                  #
#------------------------------------------------------------------------------#

@APP.route("/signup", methods=['POST'])
def signup_route():
    ''' Authenticates email / password and returns id / token '''
    display_name = request.get_json()['displayName']
    email = request.get_json()['email']
    password = request.get_json()['password']
    password_confirm = request.get_json()['passwordConfirm']

    print(f'{display_name} {email} {password} {password_confirm}', file=sys.stderr)
    time.sleep(2) #remove later, just for frontend testing

    return dumps({
        "token": "i7sdofg7ihsodifugh"
    })

@APP.route("/login", methods=['POST'])
def login_route():
    ''' Authenticates email / password and returns id / token '''
    email = request.get_json()['email']
    password = request.get_json()['password']

    print(f'{email} {password}', file=sys.stderr)
    time.sleep(2) #remove later, just for frontend testing

    # return the actual list of courses from Shoan's selenium:
    # courses = grabCourseIDs(email, password)["courses"]
    return dumps({
        "token": "token",
        "courses": ["COMP3900", "COMP3331", "COMP6080"]
    })

@APP.route("/logout", methods=['POST'])
def logout_route():
    ''' Authenticates email / password and returns id / token '''
    token = request.get_json()['token']
    print(f'{token}', file=sys.stderr)
    time.sleep(1) #remove later, just for frontend testing

    return dumps({
        "is_success": True
    })

@APP.route("/linking", methods=['POST'])
def linking_route():
    ''' Authenticates email / password and returns id / token '''
    token = request.get_json()['token']
    email = request.get_json()['email']
    password = request.get_json()['password']

    # details = grabCourseIDs(email, password)
    print(f'{token} {email} {password}', file=sys.stderr)
    time.sleep(2) #remove later, just for frontend testing

    return dumps({
        "is_success": True
    })

MESSAGES = [
            {
                "timestamp": 500,
                "message": "1",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 1000,
                "message": "2",
                "name": "The World",
                "is_current_user": False
            },
            {
                "timestamp": 1500,
                "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 500,
                "message": "4",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 1000,
                "message": "5",
                "name": "The World",
                "is_current_user": False
            },
            {
                "timestamp": 1500,
                "message": "6",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 500,
                "message": "7",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 1000,
                "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
                "name": "The World",
                "is_current_user": False
            },
            {
                "timestamp": 1500,
                "message": "9",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 500,
                "message": "10",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 1000,
                "message": "11",
                "name": "The World",
                "is_current_user": False
            },
            {
                "timestamp": 1500,
                "message": "12",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 500,
                "message": "hello world",
                "name": "Shoan",
                "is_current_user": True
            },
            {
                "timestamp": 1000,
                "message": "how about no",
                "name": "The World",
                "is_current_user": False
            },
            {
                "timestamp": 1500,
                "message": ":(",
                "name": "Shoan",
                "is_current_user": True
            },
]

@APP.route("/message/listall", methods=['GET'])
def message_list_all_route():
    ''' Authenticates email / password and returns id / token '''
    token = request.args.get("token", "null")
    course_name = request.args.get("course_name", "null")

    # details = grabCourseIDs(email, password)
    print("Inside message listall")
    print(f'{token} {course_name}')
    # time.sleep(2) #remove later, just for frontend testing

    global MESSAGES
    return dumps({
        "course_messages": MESSAGES
    })

@APP.route("/message/send", methods=['POST'])
def message_send_route():
    ''' Authenticates email / password and returns id / token '''
    token = request.get_json()['token']
    message = request.get_json()['message']

    # details = grabCourseIDs(email, password)

    print("Inside message send")
    print(f'{token} {message}')

    new_message = {
        "timestamp": 2000,
        "message": message,
        "name": "Shoan",
        "is_current_user": True
    }
    global MESSAGES
    MESSAGES.append(new_message)
    print(MESSAGES)

    return dumps({
        "is_success": True
    })

@APP.route("/channel/members", methods=['GET'])
def channel_members():
    ''' Authenticates email / password and returns id / token '''
    token = request.args.get("token", "null")
    course_name = request.args.get("course_name", "null")

    # details = grabCourseIDs(email, password)
    print("Inside channel members")
    print(f'{token} {course_name}')
    # time.sleep(2) #remove later, just for frontend testing

    return dumps({
        "member_details": [
            {
                "name": "Bob",
            },
            {
                "name": "Tammy",
            },
            {
                "name": "Timothy",
            },
            {
                "name": "Bob",
            },
            {
                "name": "Tammy",
            },
            {
                "name": "Timothy",
            },
            {
                "name": "Bob",
            },
            {
                "name": "Tammy",
            },
            {
                "name": "Timothy",
            },
            {
                "name": "Bob",
            },
            {
                "name": "Tammy",
            },
            {
                "name": "Timothy",
            },
            {
                "name": "Bob",
            },
            {
                "name": "Tammy",
            },
            {
                "name": "Timothy",
            },
            {
                "name": "Bob",
            },
            {
                "name": "Tammy",
            },
            {
                "name": "Timothy",
            },
            {
                "name": "Bob",
            },
            {
                "name": "Tammy",
            },
            {
                "name": "Timothy",
            },
        ]
    })

USERS = [
    {
        "email": "sandeep@mail.com",
        "name": "Sandeep Das",
        "display_name": "NeverReplies"
    },
    {
        "email": "shoan@mail.com",
        "name": "Shoan Desire",
        "display_name": "Desai-rable xoxo"
    },
    {
        "email": "sandeep@mail.com",
        "name": "Sandeep Das",
        "display_name": "NeverReplies"
    },
    {
        "email": "shoan@mail.com",
        "name": "Shoan Desire",
        "display_name": "Desai-rable xoxo"
    },
    {
        "email": "sandeep@mail.com",
        "name": "Sandeep Das",
        "display_name": "NeverReplies"
    },
    {
        "email": "shoan@mail.com",
        "name": "Shoan Desire",
        "display_name": "Desai-rable xoxo"
    },
]

@APP.route("/search", methods=['GET'])
def search_route():
    ''' Authenticates email / password and returns id / token '''
    token = request.args.get("token", "null")
    display_name = request.args.get("display_name", "null")

    # details = grabCourseIDs(email, password)
    print("Inside search")
    print(f'{token} {display_name}')
    # time.sleep(2) #remove later, just for frontend testing

    global USERS
    return dumps({
        "result": USERS
    })


@APP.route("/markcalc", methods=['GET'])
def mark_composition_route():
    '''  '''
    token = request.args.get("token", "null")
    course_name = request.args.get("course_name", "null")
    print(f'{token} {course_name}')
    return dumps({
        "assessments" : [
            {
                "task": "Seminar Participation",
                "weighting": 10,
                "hurdle": 0,
                "hurdle_mark": 0,
                "deadline": "Weeks 1-5, 7-10",
                "my_mark": 8,
            },
            { 
                "task": "Lecture summaries",
                "weighting": 10,
                "hurdle": 0,
                "hurdle_mark": 0,
                "deadline": "Weeks 3, 7",
                "my_mark": 9,
            },
            { 
                "task": "Movie Review",
                "weighting": 20,
                "hurdle": 0,
                "hurdle_mark": 0,
                "deadline": "Week 5",
                "my_mark": 14,
            },
            { 
                "task": "Company Case Study",
                "weighting": 40,
                "hurdle": 1,
                "hurdle_mark": 20,
                "deadline": "Week 10",
                "my_mark": 35,
            },
        ]
    })


@APP.route("/markcalc", methods=['POST'])
def markcalc_post_route():
    ''' '''
    token = request.get_json()["token"]
    course_name = request.get_json()["course_name"]
    tasks = request.get_json()["tasks"]
    marks = request.get_json()["marks"]
    
    print(f'{token} {course_name} {tasks} {marks}')

    return dumps({
        "is_success": True
    })

#------------------------------------------------------------------------------#
#                          routes: workspace/reset                             #
#------------------------------------------------------------------------------#

if __name__ == "__main__":
    APP.run(port=(3030), debug=True)
