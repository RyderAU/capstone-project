import psycopg2

 

'''
Return all information (except for password and login token) for user(s) satisfying certain criteria
Return None when no matched user can be found
'''
def read_students_data(column1, value):
    select_query = "SELECT email, student_id, name, display_name, degree, course, bio, timetable_publicity, avatar FROM students WHERE " + column1 + "='" + value +"'"
    conn = None
    user_info = []
    try:

       # local database
        conn = psycopg2.connect(database='ourunsw', 
        user='postgres', password='secret', 
        host='localhost')
        
        cur = conn.cursor()

        cur.execute(select_query)
        user_info = cur.fetchall()
        # close communication with the database
        cur.close()
        return(list(user_info))
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# print(read_students_data('email', 'helena@mail.com')) # This should retrieve avatar byte
