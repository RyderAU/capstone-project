#!/usr/bin/python
''' Test inserting new student(aka user) into table with python '''
import psycopg2

 


def register_student(student_id, name, email, display_name, hashed_pwd, login_token, degree, course):

    sql = """INSERT INTO Students(
                student_id, name, email, display_name, hashed_pwd, login_token, degree, course)
                VALUES(%s, %s, %s, %s, %s, %s, %s, %s);"""
    conn = None
    try:
        # read database configuration
        # connect to the PostgreSQL database
        conn = psycopg2.connect(database='ourUNSW', 
        user='postgres', password='sudo-sandeep-reply', 
        host='35.188.192.239', port='5432')
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (student_id, name, email, display_name, hashed_pwd, login_token, degree, course,))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

if __name__ == '__main__':
    # Register one student (Dummy data)
    register_student('z5253655', 'HAHA', 'ha@m.com', 'haha', '7878', '88', 'pikapika', 'comp sci')