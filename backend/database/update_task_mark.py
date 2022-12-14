import psycopg2

import sys
 

def update_task_data(column1, value1, column2, value2, column3, value3, column4, value4):
    
    query = "UPDATE task_mark SET %s='%s' WHERE %s='%s' AND %s='%s' AND %s='%s';" % (column1, value1, column2, value2, column3, value3, column4, value4)
    conn = None
    try:
        # read database configuration
        # local db
        conn = psycopg2.connect(database='ourunsw', 
        user='postgres', password='secret', 
        host='localhost')
        
        cur = conn.cursor()
        cur.execute(query, (column1, value1, column2, value2, column3, value3))
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
