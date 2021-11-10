''' Read all data for courses satisfying particular criteria '''
import psycopg2
# from .config import config
import urllib.parse as up

def read_courses_data(column, value):
    # Grab data
    select_query = "SELECT * FROM courses WHERE " + column + "='" + value +"';"
    conn = None
    course_info = []
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        course_info = cur.fetchall()
        return(list(course_info))
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# print(read_courses_data('course_name', 'COMP3900'))