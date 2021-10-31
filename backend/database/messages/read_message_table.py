# Receive 'email' return 'zid'

''' Read stored database '''
import psycopg2
# from .config import config
import urllib.parse as up

def get_student_id_from_email(email):
    # Grab data
    select_query = "select student_id from students where email='" + email + "';"
    conn = None
    student_id = ''
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        student_id = cur.fetchall()
        return(student_id[0][0])
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# usage
# print(get_student_id_from_email('dodo@mail.com'))


# Receive 'course_name' return 'course_id'
def get_course_id_from_course_name(course_name):
    # Grab data
    select_query = "select course_id from students where course_name='" + course_name + "';"
    conn = None
    course_id = ''
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        course_id = cur.fetchall()
        return(course_id[0][0])
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


# Receive 'course_code' return 'course_id'
def get_course_id_from_course_code(course_code):
    # Grab data
    select_query = "select course_id from courses where course_code='" + course_code + "';"
    conn = None
    course_id = ''
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        course_id = cur.fetchall()
        return(course_id[0][0])
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

print(get_course_id_from_course_code('COMP4920'))
# Store message_content, student_id, message_time
# where course_id and order by message_time