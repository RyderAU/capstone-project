import psycopg2

from .config import config_db 

def grabCourseMembers(course):
    query = "SELECT display_name FROM students WHERE course LIKE '%" + course + "%'"
    output = ""
    conn = None
    try:
        database, username, password, hostname, port = config_db()
        conn = psycopg2.connect(database=database, 
            user=username, password=password, 
            host=hostname, port=port)
        # create a new cursor
        cur = conn.cursor()

        cur.execute(query)
        output = cur.fetchall()

        if len(output) == 0:
            return None
        else:
        #clean output and return
            outputList = []
            displayNameList = []
            for element in output: 
                userDictionary = {}
                userDictionary["name"] = element[0]
                #userDictionary["email"] = element[0]
                outputList.append(userDictionary)
            return(outputList)

        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


