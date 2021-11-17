''' Read stored database '''
import psycopg2

def read_db(field):
    # Grab data
    select_query = "select * from students"
    registered_user_records = []

    conn = None
    try:
        # read database configuration
        # connect to the PostgreSQL database
        
        # local database
        conn = psycopg2.connect(database='ourunsw', 
        user='postgres', password='secret', 
        host='localhost')

        # create a new cursor
        cur = conn.cursor()

        cur.execute(select_query)
        registered_user_records = cur.fetchall()
        print('registered_user_records\n', registered_user_records)
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


    # get certain element only
    for i in registered_user_records:
        print(i[field]) # choose which field you wanna get
