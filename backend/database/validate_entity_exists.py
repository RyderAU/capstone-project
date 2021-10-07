import psycopg2
from config import config

'''
Return the first element when the value meets the given column under the specified field.
Can be used for overlap check and get hashed password for the corresponding email account.
'''
def validate_entity_exists(field, column, value):
    query = "SELECT " + field + " FROM students WHERE " + column + "='" + value +"'"
    output = ""
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(query)
        output = cur.fetchall()

        '''
        output format is [('...', '...',)]. So to only get the first outcome, do [0][0].
        I reckon it's fair to assume that returning one element atmost is enough 
        since the purpose of this function is to check data existency/returning hashed password, 
        which we only care about boolean value when it comes to existency check,
        and always there's one hashed password when it comes to auth login.
        '''
        # print('output:\n', output[0][0])
        if len(output) == 0:
            return None
        else:
            return(output[0][0])

        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

print(validate_entity_exists('hashed_pwd', 'email', "pfizer@gmail.com")) # this one exists in db
print(validate_entity_exists('*', 'email', 'pfizer2@gmail.com')) # this one is unique email

"""
e.g. 
SELECT hashed_pwd FROM students
WHERE email='pfizer@gmail.com';
"""
