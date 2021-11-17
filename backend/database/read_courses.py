''' Read all data for courses satisfying particular criteria '''
import psycopg2

def read_courses_data(column, value):
    # Grab data
    select_query = "SELECT * FROM courses WHERE " + column + "='" + value +"';"
    conn = None
    course_info = []
    try:
        # local database
        conn = psycopg2.connect(database='ourunsw', 
        user='postgres', password='secret', 
        host='localhost')
        
        cur = conn.cursor()

        cur.execute(select_query)
        course_info = cur.fetchall()

        # close communication with the database
        cur.close()

        return(list(course_info))
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# print(read_courses_data('course_name', 'COMP3900'))