''' Read all data for assessments satisfying particular criteria '''
import psycopg2

def read_task_mark_data(column, value, column2, value2, column3, value3):
    # Grab data
    select_query = "SELECT * FROM task_mark WHERE " + column + "='" + str(value) + "' AND " \
        + column2 + "='" + str(value2) + "' AND " + column3 + "='" + str(value3) + "';"
    conn = None
    mark_info = []
    try:
        # local db
        conn = psycopg2.connect(database='ourunsw', 
        user='postgres', password='secret', 
        host='localhost')
        
        cur = conn.cursor()

        cur.execute(select_query)
        mark_info = cur.fetchall()
        # close communication with the database
        cur.close()
        return(list(mark_info))
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# TESTING
# print(read_task_mark_data('course_id', '1', 'task_id', '1', 'student_id', '1'))
