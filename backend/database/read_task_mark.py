''' Read all data for assessments satisfying particular criteria '''
import psycopg2
# from .config import config
import urllib.parse as up

def read_task_mark_data(column, value, column2, value2, column3, value3):
    # Grab data
    select_query = "SELECT * FROM task_mark WHERE " + column + "='" + value + "' AND " + column2 + "='" + value2 + "' AND " + column3 + "='" + value3 + "';"
    conn = None
    mark_info = []
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        mark_info = cur.fetchall()
        return(list(mark_info))
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# print(read_task_mark_data('course_id', '1', 'task_id', '1', 'student_id', '1'))