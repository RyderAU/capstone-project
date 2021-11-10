# Receive 'email' return 'zid'

''' Read stored database '''
import psycopg2

 

def get_student_id_from_email(email):
    # Grab data
    select_query = "select student_id from students where email='" + email + "';"
    conn = None
    student_id = ''
    try:
        conn = psycopg2.connect(database='ourUNSW', 
        user='postgres', password='sudo-sandeep-reply', 
        host='35.188.192.239', port='5432')
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
    select_query = "select course_id from courses where course_name='" + course_name + "';"
    conn = None
    course_id = ''
    try:
        conn = psycopg2.connect(database='ourUNSW', 
        user='postgres', password='sudo-sandeep-reply', 
        host='35.188.192.239', port='5432')
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

# print(get_course_id_from_course_name('COMP4920'))

# Get course_id, read all the message list differentiated by course group

''' Read stored database '''
import psycopg2

 

def get_message_list_by_course_id(course_id):
    # Grab data
    select_query = "select message_id, message_content, message_time, student_id from messages" + " where course_id=" + str(course_id) + " order by message_id;"
    conn = None
    message_info = []
    try:
        conn = psycopg2.connect(database='ourUNSW', 
        user='postgres', password='sudo-sandeep-reply', 
        host='35.188.192.239', port='5432')
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        message_info = cur.fetchall()
        return(list(message_info))
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# usage
# print(get_message_list_by_course_id(1))