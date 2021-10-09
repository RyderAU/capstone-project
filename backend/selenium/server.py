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

@APP.route("/linking", methods=['POST'])
def linking_route():
    ''' Authenticates email / password and returns id / token '''
    email = request.get_json()['email']
    password = request.get_json()['password']
    print(email, file=sys.stderr)
    print(password, file=sys.stderr)

    # u_id_and_token = 42
    try:
        return dumps(grabCourseIDs(email, password))
    except:
        return dumps([])
    # time.sleep(20)

    return dumps([])


#------------------------------------------------------------------------------#
#                          routes: workspace/reset                             #
#------------------------------------------------------------------------------#

if __name__ == "__main__":
    APP.run(port=(3000), debug=False)