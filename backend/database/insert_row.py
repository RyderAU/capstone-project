#!/usr/bin/python

import psycopg2
from config import config

def register_student(
    student_id, name, email,
    display_name, hashed_pwd,
    login_token, degree):
    """ insert a new student into the students table """
    sql = """INSERT INTO Students (
                name, email,
                display_name, hashed_pwd,
                login_token, degree) VALUES(%s, %s, %s, %s, %s, %s) RETURNING student_id;"""

    conn = None
    student_id = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (name, email,
            display_name, hashed_pwd,
            login_token, degree))
        # get the generated id back
        student_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return student_id

if __name__ == '__main__':
    # insert one student
    register_student(
        'z5555556', 
        'Adam Spencer', 
        'hi@gmail.com', 
        'apple', 
        'd1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082',
        '6789dsf',
        'Computer Science')