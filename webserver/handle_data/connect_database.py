import sqlite3

conn = None
cur = None

def connectDatabase():
  global conn, cur
  if conn is None:
    conn = sqlite3.connect("../database/statistics.db")
    cur = conn.cursor()
  return conn, cur


def closeDatabase():
    global conn, cur
    if conn: 
        cur.close()
        conn.close()
        conn = None
        cur = None

