import sqlite3

conn = None
cur = None

def open_db():
    global conn, cur
    print("TEST")
    conn = sqlite3.connect("..\\database\\statistics.db", check_same_thread=False)#..\\database\\statistics.db BEI DEVELOPMENT. BEI DEPLOYMENT database/statistics.db
    cur = conn.cursor()
    print("Database successfully OPEND!")
    return conn, cur

def close_db():
    global cur
    cur.close()
    conn.close()
    print("Database successfully CLOSED!")