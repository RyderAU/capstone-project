import psycopg2
# from .config import config
import sys
import urllib.parse as up

def update_user_data(column1, column2, value1, value2):
    column_1 = column1
    column_2 = column2
    
    query = "UPDATE students SET %s='%s' WHERE %s='%s';" % (column_1, value1, column_2, value2)
    # print(query)

    conn = None
    try:
        # read database configuration
        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
        # create a new cursor
        cur = conn.cursor()
        cur.execute(query, (column1, value1, column2, value2,))
        # commit the changes to the database
        conn.commit()
        # print('successfully updated')
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return error
        
    finally:
        if conn is not None:
            conn.close()
