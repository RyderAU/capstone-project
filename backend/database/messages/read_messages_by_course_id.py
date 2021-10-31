# Get course_id, read all the message list differentiated by course group

''' Read stored database '''
import psycopg2
# from .config import config
import urllib.parse as up

def read_messages_by_course_id(course_id):
    # Grab data
    select_query = "select message_id, message_content, message_time, student_id from messages" + " where course_id=" + str(course_id) + " order by message_time;"
    conn = None
    message_info = []
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        message_info = cur.fetchall()
        return(message_info)
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# usage
# print(read_messages_by_course_id(2))