#!/usr/bin/python
''' Test inserting new student(aka user) into table with python '''
import psycopg2
from config import config


def register_student(student_id, name, email, display_name, hashed_pwd, login_token, degree):

    sql = """INSERT INTO Students(
                student_id, name, email, display_name, hashed_pwd, login_token, degree)
                VALUES(%s, %s, %s, %s, %s, %s, %s);"""
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (student_id, name, email, display_name, hashed_pwd, login_token, degree,))
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
    # insert one student (Dummy data)
    register_student(
        'z5555551', 
        'Sleepless Cetaphil', 
        'cetaphil@gmail.com', 
        'lotion', 
        'f3e5ba88661b3b5f4ae8182d8ccded09da63ef8a5e96013525ea79f082948302',
        '6789dsf',
        'Computer Science')
