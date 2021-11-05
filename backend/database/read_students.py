import psycopg2
# from .config import config
import urllib.parse as up

'''
Return all information (except for password and login token) for user(s) satisfying certain criteria
Return None when no matched user can be found
'''
def read_students_data(column1, value):
    query = "SELECT email, student_id, name, display_name, degree, course, bio, profile_publicity FROM students WHERE " + column1 + "='" + value +"'"
    conn = None
    user_info = []
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        user_info = cur.fetchall()
        return(list(user_info))
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()