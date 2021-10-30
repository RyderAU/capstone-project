#!/usr/bin/python
''' Test inserting new message(aka user) into table with python '''
import psycopg2
# from .config import config
import urllib.parse as up


def insert_message(message_id, message_content, course_id, student_id):

    sql = """INSERT INTO messages(
                message_id, message_content, message_time, course_id, student_id)
                VALUES(%s, %s, current_timestamp, %s, %s);"""
    conn = None
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (message_id, message_content, course_id, student_id))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# Driver code
if __name__ == '__main__':
    # utilise this code like below:
    #
    # insert_message('4', 'Hello World', 1, 'z5555557')