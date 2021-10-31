import psycopg2
import urllib.parse as up


def grabCourseMembers(course):
    query = "SELECT email, display_name FROM students WHERE course LIKE '%" + course + "%'"
    output = ""
    conn = None
    try:

        DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
        url = up.urlparse(DATABASE_URL)
        conn = psycopg2.connect(database=url.path[1:], 
            user=url.username, password=url.password, 
            host=url.hostname, port=url.port)
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
                outputList.append(userDictionary)
            return(outputList)

        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


