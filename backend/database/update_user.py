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

'''usage'''

# def main(argv):
#     parser = argparse.ArgumentParser()
#     parser_action = parser.add_mutually_exclusive_group(required=True)
#     parser_action.add_argument("--store", action='store_const', const=True, help="Load an image from the named file and save it in the DB")
#     parser_action.add_argument("--fetch", type=int, help="Fetch an image from the DB and store it in the named file, overwriting it if it exists. Takes the database file identifier as an argument.", metavar='42')
#     parser.add_argument("filename", help="Name of file to write to / fetch from")

#     args = parser.parse_args(argv[1:])

#     conn = psycopg2.connect(db_conn_str)
#     curs = conn.cursor()

#     # and run the command
#     if args.store:
#         # Reads the whole file into memory. If you want to avoid that,
#         # use large object storage instead of bytea; see the psycopg2
#         # and postgresql documentation.
#         f = open(args.filename,'rb')
#         filedata = f.read()
#         curs.execute("INSERT INTO files(id, orig_filename, file_data) VALUES (DEFAULT,%s,%s) RETURNING id", (args.filename, filedata))
#         returned_id = curs.fetchone()[0]
#         f.close()
#         conn.commit()
#         print("Stored {0} into DB record {1}".format(args.filename, returned_id))

#     elif args.fetch is not None:
#         # Fetches the file from the DB into memory then writes it out.
#         # Same as for store, to avoid that use a large object.
#         f = open(args.filename,'wb')
#         curs.execute("SELECT file_data, orig_filename FROM files WHERE id = %s", (int(args.fetch),))
#         (file_data, orig_filename) = curs.fetchone()

#             # In Python 3 this code works as-is.
#             # In Python 2, you must get the str from the returned buffer object.
#         f.write(file_data)
#         f.close()
#         print("Fetched {0} into file {1}; original filename was {2}".format(args.fetch, args.filename, orig_filename))

#     conn.close()

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

