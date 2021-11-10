import psycopg2

 

def grabCourseMembers(course):
    query = "SELECT display_name FROM students WHERE course LIKE '%" + course + "%'"
    output = ""
    conn = None
    try:
        # old db
        conn = psycopg2.connect(database='frnkorza', 
        user='frnkorza', password='5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg', 
        host='rosie.db.elephantsql.com', port='5432')

        # conn = psycopg2.connect(database='ourUNSW', 
        # user='postgres', password='sudo-sandeep-reply', 
        # host='35.188.192.239', port='5432')
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


