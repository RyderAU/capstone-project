''' Read all data for assessments satisfying particular criteria '''
import psycopg2

 

def read_task_data(column, value):
    # Grab data
    select_query = "SELECT * FROM task WHERE " + column + "='" + value +"';"
    conn = None
    task_info = []
    try:
        conn = psycopg2.connect(database='ourUNSW', 
        user='postgres', password='sudo-sandeep-reply', 
        host='35.188.192.239', port='5432')
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
