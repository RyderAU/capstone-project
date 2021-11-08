'''
Description: All the routes for the server are contained here

Created by: Haesandeep Dashim (Tutorial: H15A by Hoang Pham)
Created: 2020-03-27
Last Modified: 2020-03-31
'''
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
            },
            { 
                "task": "Lecture summaries",
                # due: "Weeks 3, 7",
                "weighting": "10",
                "hurdle": 0,
                "hurdle_mark": 0,
                # my_mark: "4"
            },
            { 
                "task": "Movie Review",
                # due: "Week 5",
                "weighting": "20",
                "hurdle": 0,
                "hurdle_mark": 0,
                # my_mark: "19"
            }
        ]
    })

@APP.route("/retrievemarks", methods=['GET'])
def retrieve_marks_route():
    '''  '''
    token = request.args.get("token", "null")
    course_name = request.args.get("course_name", "null")
    print(f'{token} {course_name}')
    return dumps({
        # "assessments" : [
        #     {
        #         "task": "Seminar Participation",
        #         "weighting": 10,
        #         "hurdle": 0,
        #         "hurdle_mark": 0,
        #     },
        #     { 
        #         "task": "Lecture summaries",
        #         # due: "Weeks 3, 7",
        #         "weighting": "10",
        #         "hurdle": 0,
        #         "hurdle_mark": 0,
        #         # my_mark: "4"
        #     },
        #     { 
        #         "task": "Movie Review",
        #         # due: "Week 5",
        #         "weighting": "20",
        #         "hurdle": 0,
        #         "hurdle_mark": 0,
        #         # my_mark: "19"
        #     }
        # ]
    })


#------------------------------------------------------------------------------#
#                          routes: workspace/reset                             #
#------------------------------------------------------------------------------#

if __name__ == "__main__":
    APP.run(port=(3030), debug=True)
