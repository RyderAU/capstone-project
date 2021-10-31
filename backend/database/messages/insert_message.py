#!/usr/bin/python
''' Test inserting new message(aka user) into table with python '''
import psycopg2
import urllib.parse as up

def insert_message(message_content, course_id, student_id):
    select_query = "select max(message_id) from messages;"
    conn = None
    stored_message_id = -1
    message_id = -1
    try:
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()
        cur.execute(select_query)
        stored_message_id = cur.fetchall()
        # If database is empty, initiate with message id 0
        if stored_message_id[0][0] == None:
            message_id = 0
        else:
            message_id = stored_message_id[0][0]

        # print(message_id)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        

    sql = """INSERT INTO messages(
                message_id, message_content, message_time, course_id, student_id)
                VALUES(%s, %s, current_timestamp, %s, %s);"""
    try:
        # Execute the INSERT statement
        # Increment 1 from the max message_id to keep the latest message largest
        cur.execute(sql, (message_id + 1, message_content, course_id, student_id))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


# # Driver code
# if __name__ == '__main__':
#     # Usage:
#     insert_message('lol', 1, 'z5555557')