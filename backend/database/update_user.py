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
        print('successfully updated')
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return error
        
    finally:
        if conn is not None:
            conn.close()

'''usage'''


# fixed = 'timetable_week_'
# # for i in range(0, 10):
# #     var = str(i+1)
# #     col_name = fixed + var
# #     print(col_name)
# # print(timetables[0])
# update_user_data(fixed + '1', 'email', str(timetables[0]), 'h@m.com')
# # update_user_data(fixed + '2', 'email', timetables[1], 'h@m.com')
# # update_user_data(fixed + '3', 'email', timetables[2], 'h@m.com')
# # update_user_data(fixed + '4', 'email', timetables[3], 'h@m.com')
# # update_user_data(fixed + '5', 'email', timetables[4], 'h@m.com')
# # update_user_data(fixed + '6', 'email', timetables[5], 'h@m.com')
# # update_user_data(fixed + '7', 'email', timetables[6], 'h@m.com')
# # update_user_data(fixed + '8', 'email', timetables[7], 'h@m.com')
# # update_user_data(fixed + '9', 'email', timetables[8], 'h@m.com')
# # update_user_data(fixed + '10', 'email', timetables[9], 'h@m.com')

