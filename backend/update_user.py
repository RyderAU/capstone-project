import psycopg2
from config import config
import sys

def update_user_data(column1, column2, value1, value2):
    column_1 = column1
    column_2 = column2
    # value2 = "'; drop database sample; --"
    query = "UPDATE students SET %s='%s' WHERE %s='%s';" % (column_1, value1, column_2, value2)
    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        cur.execute(query, (column1, value1, column2, value2,))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        return error
        
    finally:
        if conn is not None:
            conn.close()

'''usage'''
update_user_data('display_name', 'student_id', 'selena', "'; drop database testhack; --")
# print(update_user_data('display_name', 'student_id', 'selena', "'; drop database testhack; --"))
