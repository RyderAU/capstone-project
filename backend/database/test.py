# import psycopg2
import urllib.parse as up


DATABASE_URL = 'postgres://frnkorza:5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg@rosie.db.elephantsql.com/frnkorza'
# password = 5n3CB1-5ZcZwHt2y781wKZfhaEFdfjlg

url = up.urlparse(DATABASE_URL)
# conn = psycopg2.connect(database=url.path[1:], user=url.username, password=url.password, host=url.hostname, port=url.port )
print(url.path[1:], url.username, url.password, url.hostname, url.port)
