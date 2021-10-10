'''
Description: All the routes for the server are contained here

Created by: Sandeep Das (Tutorial: H15A by Hoang Pham)
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


# @APP.route("/linking", methods=['POST'])
# def linking_route():
#     ''' Authenticates email / password and returns id / token '''
#     email = request.get_json()['email']
#     password = request.get_json()['password']

#     details = grabCourseIDs(email, password)
#     time.sleep(5) #remove later, just for frontend testing
#     return dumps({
#         "courses": details["courses"]
#     })


#------------------------------------------------------------------------------#
#                          routes: workspace/reset                             #
#------------------------------------------------------------------------------#

if __name__ == "__main__":
    APP.run(port=(3030), debug=False)
