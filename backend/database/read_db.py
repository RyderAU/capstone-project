''' Read stored database '''
import psycopg2
from config import config

# Grab data
select_query = "select * from students"
registered_user_records = []

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
    # print(registered_user_records)
    # close communication with the database
    cur.close()
except (Exception, psycopg2.DatabaseError) as error:
    print(error)
finally:
    if conn is not None:
        conn.close()

# get certain element only
for i in registered_user_records:
    print(i[3]) # choose which field you wanna get