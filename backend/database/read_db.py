''' Read stored database '''
import psycopg2
from config import config

def read(field, criteria, value)
# Grab data
select_query = "select "  + field + " from students where " + criteria + "=" + value
conn = None
try:
    # read database configuration
    params = config()
    # connect to the PostgreSQL database
    conn = psycopg2.connect(**params)
    # create a new cursor
    cur = conn.cursor()
    # execute the INSERT statement
    cur.execute(select_query)
    registered_user_records = cur.fetchall()
    print(registered_user_records)
    # close communication with the database
    cur.close()
except (Exception, psycopg2.DatabaseError) as error:
    print(error)
finally:
    if conn is not None:
        conn.close()
