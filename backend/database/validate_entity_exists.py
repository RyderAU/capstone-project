import psycopg2

'''
Return the first element when the value meets the given column under the specified field.
Can be used for overlap check and get hashed password for the corresponding email account.
'''
def validate_entity_exists(column1, column2, value):
    query = "SELECT " + column1 + " FROM students WHERE " + column2 + "='" + value +"'"
    output = ""
    conn = None
    try:
        # read database configuration

        # connect to the PostgreSQL database
        
        # local db
        conn = psycopg2.connect(database='ourunsw', 
        user='postgres', password='secret', 
        host='localhost')

        # create a new cursor
        cur = conn.cursor()

        cur.execute(query)
        output = cur.fetchall()
        # close communication with the database
        cur.close()

        '''
        output format is [('...', '...',)]. So to only get the first outcome, do [0][0].
        We assume that returning one element atmost is enough 
        since the purpose of this function is to check data existency/returning hashed password, 
        which we only care about boolean value when it comes to existency check,
        and always there's one hashed password when it comes to auth login.
        '''
        if len(output) == 0:
            return None
        else:
            return(output[0][0])

        
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# TESTING
# print(validate_entity_exists('display_name', 'email', 'haesun@mail.com'))

"""
USAGE EXAMPLE

SELECT hashed_pwd FROM students
WHERE email='pfizer@gmail.com';
"""
