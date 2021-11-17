''' Read all data for assessments satisfying particular criteria '''
import psycopg2

 

def read_task_data(column, value):
    # Grab data
    print("READ TASK DATAAAAAAAAA ", column, value)
    select_query = "SELECT * FROM task WHERE " + column + "='" + str(value) +"';"

    conn = None
    task_info = []
    try:
        # local db
        conn = psycopg2.connect(database='ourunsw', 
        user='postgres', password='secret', 
        host='localhost')
        
        cur = conn.cursor()

        cur.execute(select_query)
        task_info = cur.fetchall()
        # close communication with the database
        cur.close()
        print(list(task_info))
        return(list(task_info))
        
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
