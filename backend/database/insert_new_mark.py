#!/usr/bin/python
''' Test inserting new mark for a student in a particular task into table with python '''
import psycopg2


def insert_mark(mark, task_id, student_id, course_id):
    select_query = "select max(task_mark_id) from task_mark;"
    conn = None
    stored_mark_id = -1
    mark_id = -1
    try:
        conn = psycopg2.connect(database='frnkorza', 
        user='frnkorza', password='5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg', 
        host='rosie.db.elephantsql.com', port='5432')
        
        # create a new cursor
        cur = conn.cursor()
        cur.execute(select_query)
        stored_mark_id = cur.fetchall()
        # If database is empty, initiate with mark id 0
        if stored_mark_id[0][0] == None:
            mark_id = 0
        else:
            mark_id = stored_mark_id[0][0]

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        

    sql = """INSERT INTO task_mark(
                task_mark_id, mark, task_id, student_id, course_id)
                VALUES(%s, %s, %s, %s, %s);"""
    
    try:
        # Execute the INSERT statement
        # Increment 1 from the max mark_id to keep the latest mark largest
        cur.execute(sql, (mark_id + 1, mark, task_id, student_id, course_id,))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    

# if __name__ == '__main__':
#     # Register one student (Dummy data)
#     insert_mark(
#         '100', 
#         '1', 
#         '1', 
#         '1')