import sqlite3

conn = None
cur = None

def open_db():
    global conn, cur
    conn = sqlite3.connect("..\\database\\statistics.db", check_same_thread=False)
    cur = conn.cursor()

def close_db():
    global cur
    cur.close()
    conn.close()
    print("Database successfully closed!")

# def messages():
#     date = []
#     count = [] 

#     results = cur.execute("SELECT DATE(date) AS date, COUNT(*) AS count FROM messages GROUP BY DATE(date)")

#     for row in results:
#         date.append(row[0])
#         count.append(row[1])

#     cur.close()
#     conn.close()

#     return date, count

def message_count_start_date():
    global cur

    cur.execute("SELECT date FROM guilds WHERE id = 1033345062354026536")
    date = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM messages")
    count = cur.fetchone()[0]

    return [count, date]
