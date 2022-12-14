import psycopg2

import sys
 

def update_user_data(column1, column2, value1, value2):
    column_1 = column1
    column_2 = column2
    
    query = "UPDATE students SET %s='%s' WHERE %s='%s';" % (column_1, value1, column_2, value2)

    conn = None
    try:
        # read database configuration

        # local db
        conn = psycopg2.connect(database='ourunsw', 
        user='postgres', password='secret', 
        host='localhost')
        
        # create a new cursor
        cur = conn.cursor()
        cur.execute(query, (column1, value1, column2, value2,))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return error
        
    finally:
        if conn is not None:
            conn.close()
