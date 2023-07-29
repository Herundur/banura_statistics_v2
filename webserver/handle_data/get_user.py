from handle_data.connect_database import *
from handle_data.get_data import *
import urllib.parse

def dropdown_suggestions(query):
    conn, cur = open_db()
    cur.execute("SELECT username, nickname FROM users WHERE username LIKE ? OR nickname LIKE ?", ('%' + query + '%', '%' + query + '%'))
    rows = cur.fetchall()
    results = [{'username': row[0], 'nickname': row[1]} for row in rows]
    close_db()
    return results

def get_user_id(query):
    decoded_query = urllib.parse.unquote(query)
    if "|" in decoded_query:
       name = decoded_query.split('|')[0].strip().lower()
    else:
       name = decoded_query.strip().lower()
    conn, cur = open_db()
    cur.execute("SELECT id FROM users WHERE LOWER(username) = ? OR LOWER(nickname) = ?", ((name, name)))
    user_id = cur.fetchone()
    print(user_id)
    if(user_id):
        user_id = user_id[0]
        return user_id
    close_db()
    return name

def get_user_data(id):
    sql = "WHERE author_id = " + str(id)
    conn, cur = open_db()
    user_data, formatted_date = user_info(cur, id)
    data = {
        "picture": user_data[0],
        "username": user_data[1],
        "nickname": user_data[2],
        "date": formatted_date,
        "gesendete_nachrichten_text": messages_count(cur, user=sql),
        "nachrichten_pro_tag_text": messages_average(cur, user=sql),
        "aktivität_nach_wochentage_chart": messages_per_weekday(cur, user=sql),
        "aktivität_nach_stunden_chart": messages_per_one_day(cur, user=sql),
        "channel_rangliste_chart": channel_leaderboard(cur, user=sql),
        "spieler_rangliste_platzierung": user_rank(cur, id),
    }
    close_db()
    return data