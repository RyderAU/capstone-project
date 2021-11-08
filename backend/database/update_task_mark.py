import psycopg2
# from .config import config
import sys
import urllib.parse as up

def update_task_data(column1, value1, column2, value2, column3, value3, column4, value4):
    
    query = "UPDATE task_mark SET %s='%s' WHERE %s='%s' AND %s='%s' AND %s='%s';" % (column1, value1, column2, value2, column3, value3, column4, value4)
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
        cur.execute(query, (column1, value1, column2, value2, column3, value3))
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
