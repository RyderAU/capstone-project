''' Read stored database '''
import psycopg2

from .config import config_db 

def read_db(field):
    # Grab data
    select_query = "select * from students"
    registered_user_records = []

    conn = None
    try:
        # # read database configuration
        # params = config()
        # # connect to the PostgreSQL database
        # conn = psycopg2.connect(**params)
        database, username, password, hostname, port = config_db()
        conn = psycopg2.connect(database=database, 
            user=username, password=password, 
            host=hostname, port=port)
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

    # 3 -> display_name


    # get certain element only
    for i in registered_user_records:
        print(i[field]) # choose which field you wanna get