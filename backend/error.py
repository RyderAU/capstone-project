from werkzeug.exceptions import HTTPException

# class AccessError(HTTPException):
#     code = 400
#     message = 'No message specified'

class InputError(HTTPException):
    code = 400
    message = 'No message specified'

class LogoutError(HTTPException):
    code = 400
    message = 'No message specified'