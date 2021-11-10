''' Read all data for courses satisfying particular criteria '''
import psycopg2

def read_courses_data(column, value):
    # Grab data
    select_query = "SELECT * FROM courses WHERE " + column + "='" + value +"';"
    conn = None
    course_info = []
    try:
        # old db
        conn = psycopg2.connect(database='frnkorza', 
        user='frnkorza', password='5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg', 
        host='rosie.db.elephantsql.com', port='5432')
        
        # conn = psycopg2.connect(database='ourUNSW', 
        #     user='postgres', password='sudo-sandeep-reply', 
        #     host='35.188.192.239', port='5432')
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        course_info = cur.fetchall()
        return(list(course_info))
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# print(read_courses_data('course_name', 'COMP3900'))