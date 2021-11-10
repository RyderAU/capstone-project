''' Read all data for assessments satisfying particular criteria '''
import psycopg2

from config import config_db 

def read_task_data(column, value):
    # Grab data
    select_query = "SELECT * FROM task WHERE " + column + "='" + value +"';"
    conn = None
    task_info = []
    try:
        database, username, password, hostname, port = config_db()
        conn = psycopg2.connect(database=database, 
            user=username, password=password, 
            host=hostname, port=port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        task_info = cur.fetchall()
        cur.close()

        return(list(task_info))
        # close communication with the database
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
