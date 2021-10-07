import psycopg2
from config import config


def update_user_data(column1, column2, value1, value2):
    query = "UPDATE students SET "+column1+"='"+value1+"'"+"WHERE "+column2+"='"+value2+"';"

    conn = None
    try:
        # read database configuration
        params = config()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(query)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

'''usage'''
update_user_data('display_name', 'student_id', 'newname_pfizer2', 'z5555551')

# UPDATE students
# SET display_name = 'newname_pfizer2'
# WHERE student_id = 'z5555551';