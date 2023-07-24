from datetime import datetime

def timespanToSQL(timespan):
    sql = ""
    if (timespan == "letzte30Tage"):
        sql = "WHERE messages.date >= date('now', '-1 months')"
    elif (timespan == "letzte7Tage"):
        sql = "WHERE messages.date >= date('now', '-6 days')"
    elif (timespan == "letzte7TageDifference"):
        sql = "WHERE messages.date < date('now', '-6 days') AND messages.date >= date('now', '-13 days')"
    elif (timespan == "letzte30TageDifference"):
        sql = "WHERE messages.date < date('now', '-1 months') AND messages.date >= date('now', '-2 months')"
    return sql


def getMessbeginn(cur):
    cur.execute(f"SELECT strftime('%d.%m.%Y', date) FROM messages WHERE number = 1")
    date = cur.fetchone()[0]
    return date


def messages_count(cur, timespan = ""):
    SQLtimespan = timespanToSQL(timespan)
    cur.execute(f"SELECT COUNT(*) FROM messages {SQLtimespan}")
    count = cur.fetchone()[0]
    return count


def messages_average(cur, timespan = ""):
    today = datetime.now()
    SQLtimespan = timespanToSQL(timespan)
    cur.execute(f"SELECT COUNT(*) / (JulianDay(?) - JulianDay(MIN(DATETIME(date)))) \
                    FROM messages {SQLtimespan}", (today,))
    average_messages_per_day = cur.fetchone()[0]
    if (average_messages_per_day == None): 
        return 0
    average_messages_per_day = round(average_messages_per_day, 1)
    return average_messages_per_day


def messages_average_chart_month(cur):
    cur.execute("""
        SELECT strftime('%Y-%m', date) AS month, COUNT(*) AS count
        FROM messages
        WHERE date >= date('now', '-11 months')
        GROUP BY month
        ORDER BY month
        """)
    rows = cur.fetchall()
    newRows = []
    for row in rows:
        month, message_count = row
        newMonth = ""
        match month[-2:]:
            case "01":
                 newMonth = "Januar"
            case "02":
                 newMonth = "Februar"
            case "03":
                 newMonth = "März"          
            case "04":
                 newMonth = "April"
            case "05":
                 newMonth = "Mai"
            case "06":
                 newMonth = "Juni"
            case "07":
                 newMonth = "Juli"          
            case "08":
                 newMonth = "August"
            case "09":
                 newMonth = "September"
            case "10":
                 newMonth = "Oktober"
            case "11":
                 newMonth = "November"          
            case "12":
                 newMonth = "Dezember"
            case _:
                print(f"Wrong input Date")
        newMonth += " " + month[:4]
        newRows.append((newMonth, message_count))
    return newRows


def messages_average_chart_day(cur, timespan):
    cur.execute(f"""
        WITH RECURSIVE all_days(day) AS (
            SELECT date('now', {timespan}) AS day
            UNION ALL
            SELECT date(day, '+1 day')
            FROM all_days
            WHERE day < date('now')
        )
        SELECT strftime('%d.%m', all_days.day) AS day, COUNT(messages.date) AS count
        FROM all_days
        LEFT JOIN messages ON strftime('%d.%m', all_days.day) = strftime('%d.%m', messages.date)
        GROUP BY all_days.day
        ORDER BY all_days.day;
        """)
    rows = cur.fetchall()
    return rows


def messages_per_weekday(cur, timespan = ""):
    SQLtimespan = timespanToSQL(timespan)
    cur.execute(f"""
        SELECT strftime('%w', date) AS weekday, COUNT(*) AS count
        FROM messages
        {SQLtimespan}
        GROUP BY weekday
        ORDER BY weekday
        """)

    rows = cur.fetchall()
    newRows = []
    weekdays = [
        "Sonntag", "Montag", "Dienstag", 
        "Mittwoch", "Donnerstag", "Freitag", 
        "Samstag"
    ]
    
    n = 0
    for i in range(7):
        if len(rows) != 0:
            if i == int(rows[n][0]):
                weekday_index, message_count = rows[n]
                weekday = weekdays[int(weekday_index)]
                newRows.append((weekday, message_count))
                if (n < len(rows) - 1): 
                    n += 1
            else:
                newRows.append((weekdays[i], 0))
        else:
            newRows.append((weekdays[i], 0))

    newRows.insert(6, newRows.pop(0))
    return newRows


def messages_per_one_day(cur, timespan = ""):
    SQLtimespan = timespanToSQL(timespan)
    cur.execute(f"""
    SELECT
    CASE
    WHEN strftime('%H', date) BETWEEN '00' AND '01' THEN '00:00-01:59'
    WHEN strftime('%H', date) BETWEEN '02' AND '03' THEN '02:00-03:59'
    WHEN strftime('%H', date) BETWEEN '04' AND '05' THEN '04:00-05:59'
    WHEN strftime('%H', date) BETWEEN '06' AND '07' THEN '06:00-07:59'
    WHEN strftime('%H', date) BETWEEN '08' AND '09' THEN '08:00-09:59'
    WHEN strftime('%H', date) BETWEEN '10' AND '11' THEN '10:00-11:59'
    WHEN strftime('%H', date) BETWEEN '12' AND '13' THEN '12:00-13:59'
    WHEN strftime('%H', date) BETWEEN '14' AND '15' THEN '14:00-15:59'
    WHEN strftime('%H', date) BETWEEN '16' AND '17' THEN '16:00-17:59'
    WHEN strftime('%H', date) BETWEEN '18' AND '19' THEN '18:00-19:59'
    WHEN strftime('%H', date) BETWEEN '20' AND '21' THEN '20:00-21:59'
    WHEN strftime('%H', date) BETWEEN '22' AND '23' THEN '22:00-23:59'       
    ELSE 'Unknown'
    END AS time_span,
    COUNT(*) AS message_count
    FROM messages
    {SQLtimespan}
    GROUP BY time_span
    ORDER BY time_span
    """)

    rows = cur.fetchall()
    newRows = []
    hours = [
        "00:00-01:59", "02:00-03:59", "04:00-05:59", 
        "06:00-07:59", "08:00-09:59", "10:00-11:59", 
        "12:00-13:59", "14:00-15:59", "16:00-17:59", 
        "18:00-19:59", "20:00-21:59", "22:00-23:59"
    ]
    
    n = 0
    for i in range(12):
        if len(rows) != 0:
            if hours[i] == rows[n][0]:
                message_count = rows[n][1]
                newRows.append((hours[i], message_count))
                if (n < len(rows) - 1): 
                    n += 1
            else:
                newRows.append((hours[i], 0))
        else:
            newRows.append((hours[i], 0))

    return newRows

def lol_pings(cur, timespan = ""):
    SQLtimespan = ""
    if timespan is not "":
        SQLtimespan = "AND " + timespanToSQL(timespan)[6:]
    print(SQLtimespan)
    cur.execute(f"""
                SELECT COUNT(*) 
                FROM messages 
                WHERE mention_role = 'lol'
                {SQLtimespan}""")
    lol_pings = cur.fetchone()[0]
    return lol_pings

def channel_leaderboard(cur, timespan = ""):
    SQLtimespan = timespanToSQL(timespan)
    cur.execute(f"""
                SELECT channels.name, COUNT(*) AS count 
                FROM messages 
                JOIN channels ON channels.id = messages.channel_id
                {SQLtimespan}
                GROUP BY channel_id 
                ORDER BY count DESC
                LIMIT 5
                """)

    rows = cur.fetchall()
    return rows

def user_count(cur, timespan = ""):
    SQLtimespan = ""
    if (timespan == "letzte7TageDifference"):
        SQLtimespan = "AND date < date('now', '-6 days')"
    elif (timespan == "letzte30TageDifference"):
        SQLtimespan = "AND date < date('now', '-1 months')"
    cur.execute(f"""SELECT COUNT(*) 
                FROM users 
                WHERE bot = 0
                {SQLtimespan}
                """)
    user_count = cur.fetchone()[0]
    return user_count

def user_leaderboard(cur, timespan = ""):
    SQLtimespan = timespanToSQL(timespan)
    cur.execute(f"""
                SELECT users.username, COUNT(*) AS count 
                FROM messages 
                JOIN users ON users.id = messages.author_id
                {SQLtimespan} 
                GROUP BY messages.author_id 
                ORDER BY count DESC
                LIMIT 10
                """)

    rows = cur.fetchall()
    return rows