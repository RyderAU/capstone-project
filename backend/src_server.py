'''
Description: All the routes for the server are contained here

Created by: Helena Ling and Sandeep Das
'''
import sys
from json import dumps
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from courseGrabber import grabCourseIDs
from update_user import update_user_data
# from System import *
from System import auth_login, logout, register, validate_token

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

@APP.route("/auth/login", methods=['POST'])
def auth_login_route():
    ''' Authenticates email / password and returns id / token '''
    email = request.get_json()['email']
    password = request.get_json()['password']

    email_and_token = auth_login(email, password)
    return dumps(email_and_token)

@APP.route("/auth/logout", methods=['POST'])
def auth_logout_route():
    ''' Logs user out when given a valid token '''
    token = request.get_json()['token']

    is_success = logout(token)
    return dumps(is_success)

@APP.route("/auth/register", methods=['POST'])
def auth_register_route():
    ''' Creates an account given details and returns id / token '''
    email = request.get_json()['email']
    password = request.get_json()['password']
    reentered_password = request.get_json()['reentered_password']
    username = request.get_json()['username']

    email_and_token = register(username, password, reentered_password, email)
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

        courses = userDetails.get("courses")
        db_course = ''
        for element in courses:
            db_course += element
            if (courses[-1] != element):
                db_course += ','
            
        # expected is db_course == 'elem1, elem2'

        # Insert into the database
        personal_email = validate_token(token)
        update_user_data('student_id', 'email', userDetails.get("zID"), personal_email)
        update_user_data('degree', 'email', userDetails.get("degree"), personal_email)
        update_user_data('name', 'email', userDetails.get("name"), personal_email)
        update_user_data('course', 'email', db_course, personal_email)

        # For frontend
        return dumps(courses)
    except:
        # Error in selenium or error in inserting into database
        raise InputError('Unable to link to myUNSW. Please check your credentials again')


#------------------------------------------------------------------------------#
#                          routes: workspace/reset                             #
#------------------------------------------------------------------------------#

if __name__ == "__main__":
    APP.run(port=(3030), debug=False)


#------------------------------------------------------------------------------#
#                              routes: channel                                 #
#------------------------------------------------------------------------------#

# @APP.route("/channel/invite", methods=['POST'])
# def channel_invite_route():
#     ''' Invites a user to join a channel '''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']
#     u_id = request.get_json()['u_id']

#     empty_dict = channel_invite(token, int(channel_id), int(u_id))
#     return dumps(empty_dict)


# @APP.route("/channel/details", methods=['GET'])
# def channel_details_route():
#     ''' Provide basic details about the channel '''
#     token = request.args.get('token')
#     channel_id = request.args.get('channel_id')

#     name_owner_all = channel_details(token, int(channel_id))
#     return dumps(name_owner_all)


# @APP.route("/channel/messages", methods=['GET'])
# def channel_messages_route():
#     ''' Returns up to 50 messages '''
#     token = request.args.get('token')
#     channel_id = request.args.get('channel_id')
#     start = request.args.get('start')

#     messages_start_end = channel_messages(token, int(channel_id), int(start))
#     return dumps(messages_start_end)


# @APP.route("/channel/leave", methods=['POST'])
# def channel_leave_route():
#     ''' User leaves channel  '''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']

#     empty_dict = channel_leave(token, int(channel_id))
#     return dumps(empty_dict)


# @APP.route("/channel/join", methods=['POST'])
# def channel_join_route():
#     ''' User joins channel  '''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']

#     empty_dict = channel_join(token, int(channel_id))
#     return dumps(empty_dict)


# @APP.route("/channel/addowner", methods=['POST'])
# def channel_addowner_route():
#     ''' User is added as an owner of the channel  '''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']
#     u_id = request.get_json()['u_id']

#     empty_dict = channel_addowner(token, int(channel_id), int(u_id))
#     return dumps(empty_dict)


# @APP.route("/channel/removeowner", methods=['POST'])
# def channel_removeowner_route():
#     ''' User is removed as an owner of the channel  '''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']
#     u_id = request.get_json()['u_id']

#     empty_dict = channel_removeowner(token, int(channel_id), int(u_id))
#     return dumps(empty_dict)

# #------------------------------------------------------------------------------#
# #                              routes: channels                                #
# #------------------------------------------------------------------------------#

# @APP.route("/channels/list", methods=['GET'])
# def channels_list_route():
#     ''' Lists channel info that user is a part of  '''
#     token = request.args.get('token')

#     channels = channels_list(token)
#     return dumps(channels)


# @APP.route("/channels/listall", methods=['GET'])
# def channels_listall_route():
#     ''' Lists all channel info'''
#     token = request.args.get('token')

#     channels = channels_listall(token)
#     return dumps(channels)


# @APP.route("/channels/create", methods=['POST'])
# def channels_create_route():
#     '''Creates a new channel'''
#     token = request.get_json()['token']
#     name = request.get_json()['name']
#     is_public = request.get_json()['is_public']

#     channel_id = channels_create(token, name, int(is_public))
#     return dumps(channel_id)


# #------------------------------------------------------------------------------#
# #                              routes: message                                 #
# #------------------------------------------------------------------------------#

# @APP.route("/message/send", methods=['POST'])
# def message_send_route():
#     '''Sends a message'''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']
#     message = request.get_json()['message']

#     message_id = message_send(token, int(channel_id), message)
#     return dumps(message_id)


# @APP.route("/message/sendlater", methods=['POST'])
# def message_sendlater_route():
#     '''Sends a message after a buffer time'''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']
#     message = request.get_json()['message']
#     time_sent = request.get_json()['time_sent']

#     message_id = message_sendlater(token, int(channel_id), message, int(time_sent))
#     return dumps(message_id)


# @APP.route("/message/react", methods=['POST'])
# def message_react_route():
#     '''Reacts to a message'''
#     token = request.get_json()['token']
#     message_id = request.get_json()['message_id']
#     react_id = request.get_json()['react_id']

#     empty_dict = message_react(token, int(message_id), int(react_id))
#     return dumps(empty_dict)


# @APP.route("/message/unreact", methods=['POST'])
# def message_unreact_route():
#     '''unreacts to a message'''
#     token = request.get_json()['token']
#     message_id = request.get_json()['message_id']
#     react_id = request.get_json()['react_id']

#     empty_dict = message_unreact(token, int(message_id), int(react_id))
#     return dumps(empty_dict)


# @APP.route("/message/pin", methods=['POST'])
# def message_pin_route():
#     '''Pins to a message'''
#     token = request.get_json()['token']
#     message_id = request.get_json()['message_id']

#     empty_dict = message_pin(token, int(message_id))
#     return dumps(empty_dict)


# @APP.route("/message/unpin", methods=['POST'])
# def message_unpin_route():
#     '''Unpins to a message'''
#     token = request.get_json()['token']
#     message_id = request.get_json()['message_id']

#     empty_dict = message_unpin(token, int(message_id))
#     return dumps(empty_dict)

# @APP.route("/message/remove", methods=['DELETE'])
# def message_remove_route():
#     '''Removes a message'''
#     token = request.get_json()['token']
#     message_id = request.get_json()['message_id']

#     empty_dict = message_remove(token, int(message_id))
#     return dumps(empty_dict)


# @APP.route("/message/edit", methods=['PUT'])
# def message_edit_route():
#     '''Edits a message'''
#     token = request.get_json()['token']
#     message_id = request.get_json()['message_id']
#     message = request.get_json()['message']

#     empty_dict = message_edit(token, int(message_id), message)
#     return dumps(empty_dict)

# #------------------------------------------------------------------------------#
# #                               routes: user                                   #
# #------------------------------------------------------------------------------#

# @APP.route("/user/profile", methods=['GET'])
# def user_profile_route():
#     '''Returns user info'''
#     token = request.args.get('token')
#     u_id = request.args.get('u_id')

#     user = user_profile(token, int(u_id))
#     return dumps(user)


# @APP.route("/user/profile/setname", methods=['PUT'])
# def user_profile_setname_route():
#     '''Update user's first and last name'''
#     token = request.get_json()['token']
#     name_first = request.get_json()['name_first']
#     name_last = request.get_json()['name_last']

#     empty_dict = user_profile_setname(token, name_first, name_last)
#     return dumps(empty_dict)


# @APP.route("/user/profile/setemail", methods=['PUT'])
# def user_profile_setemail_route():
#     '''Update user's email address'''
#     token = request.get_json()['token']
#     email = request.get_json()['email']

#     empty_dict = user_profile_setemail(token, email)
#     return dumps(empty_dict)


# @APP.route("/user/profile/sethandle", methods=['PUT'])
# def user_profile_sethandle_route():
#     '''Update user's handle_str'''
#     token = request.get_json()['token']
#     handle_str = request.get_json()['handle_str']

#     empty_dict = user_profile_sethandle(token, handle_str)
#     return dumps(empty_dict)

# #------------------------------------------------------------------------------#
# #                               routes: other                                  #
# #------------------------------------------------------------------------------#

# @APP.route("/users/all", methods=['GET'])
# def users_all_route():
#     ''' Returns list of all users info'''
#     token = request.args.get('token')

#     users = users_all(token)
#     return dumps(users)


# @APP.route("/search", methods=['GET'])
# def search_route():
#     ''' Searches for messages in user's channels'''
#     token = request.args.get('token')
#     query_str = request.args.get('query_str')

#     messages = search(token, query_str)
#     return dumps(messages)

# @APP.route("/user/profile/uploadphoto", methods=['POST'])
# def user_profile_uploadphoto_route():
#     '''Upload Photo'''
#     token = request.get_json()['token']
#     img_url = request.get_json()['img_url']
#     x_start = int(request.get_json()['x_start'])
#     y_start = int(request.get_json()['y_start'])
#     x_end = int(request.get_json()['x_end'])
#     y_end = int(request.get_json()['y_end'])

#     empty_dict = user_profile_uploadphoto(token, img_url, x_start, y_start, x_end, y_end)
#     return dumps(empty_dict)

# @APP.route("/imgurl/<image_name>")
# def dynamic_route(image_name):
#     '''Dynamic route'''
#     file_path = 'static'
#     return send_from_directory(file_path, f"{image_name}", mimetype="image/jpg")



# @APP.route("/admin/userpermission/change", methods=['POST'])
# def admin_user_permission_change_route():
#     '''Setting new permissions'''
#     token = request.get_json()['token']
#     u_id = request.get_json()['u_id']
#     permission_id = request.get_json()['permission_id']

#     empty_dict = admin_userpermission_change(token, int(u_id), int(permission_id))
#     return dumps(empty_dict)

# @APP.route("/admin/user/remove", methods=['DELETE'])
# def admin_user_remove_route():
#     '''Removing user from Slackr'''
#     token = request.get_json()['token']
#     u_id = request.get_json()['u_id']

#     empty_dict = admin_user_remove(token, int(u_id))
#     return dumps(empty_dict)

# #------------------------------------------------------------------------------#
# #                              routes: standup                                 #
# #------------------------------------------------------------------------------#


# @APP.route("/standup/start", methods=['POST'])
# def standup_start_route():
#     '''Starting a standup'''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']
#     length = request.get_json()['length']

#     time_finish = standup_start(token, int(channel_id), int(length))
#     return dumps(time_finish)


# @APP.route("/standup/active", methods=['GET'])
# def standup_active_route():
#     '''Checks if active and when it finishes'''
#     token = request.args.get('token')
#     channel_id = request.args.get('channel_id')

#     is_active_and_time_finish = standup_active(token, int(channel_id))
#     return dumps(is_active_and_time_finish)


# @APP.route("/standup/send", methods=['POST'])
# def standup_send_route():
#     '''Sending a message to get buffered in the standup queue,'''
#     token = request.get_json()['token']
#     channel_id = request.get_json()['channel_id']
#     message = request.get_json()['message']

#     empty_dict = standup_send(token, int(channel_id), message)
#     return dumps(empty_dict)

# #------------------------------------------------------------------------------#
# #                          routes: workspace/reset                             #
# #------------------------------------------------------------------------------#

# @APP.route("/workspace/reset", methods=['POST'])
# def workspace_reset_route():
#     ''' User leaves channel  '''
#     workplace_reset()
#     return dumps({})

# def get_port():
#     '''Finds the port'''
#     return int(sys.argv[1]) if len(sys.argv) == 2 else 9070

# if __name__ == "__main__":
#     DATA = get_data()
#     DATA['port'] = get_port()
#     update_data(DATA)
#     APP.run(port=(DATA['port']), debug=False)
