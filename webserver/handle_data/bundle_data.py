from handle_data.connect_database import *
from handle_data.get_data import *

def load_data(timespan):

    conn, cur = open_db()

    data = {
        "messbeginn": getMessbeginn(cur),
        "gesendete_nachrichten_text": None,
        "gesendete_nachrichten_difference": None,
        "gesenedte_nachrichten_timespan": None,
        "nachrichten_pro_tag_text": None,
        "nachrichten_pro_tag_chart": None,
        "aktivität_nach_wochentage_chart": None,
        "aktivität_nach_stunden_chart": None,
        "leauge_of_legends_pings_text": None,
        "leauge_of_legends_pings_difference": None,
        "leauge_of_legends_pings_timespan": None,
        "channel_rangliste_chart": None,
        "spieleranzahl_text": None,
        "spieleranzahl_difference": None,
        "spieleranzahl_timespan": None,
        "spieler_rangliste": None,
    }

    if (timespan == "seitBeginn"):
        print("Seit Beginn!")
        data["gesendete_nachrichten_text"] = messages_count(cur)
        data["gesendete_nachrichten_difference"] = "hidden"
        data["gesenedte_nachrichten_timespan"] = "hidden"
        data["nachrichten_pro_tag_text"] = messages_average(cur)
        data["nachrichten_pro_tag_chart"] = messages_average_chart_month(cur)
        data["aktivität_nach_wochentage_chart"] = messages_per_weekday(cur)
        data["aktivität_nach_stunden_chart"] = messages_per_one_day(cur)
        data["leauge_of_legends_pings_text"] = lol_pings(cur)
        data["leauge_of_legends_pings_difference"] = "hidden"
        data["leauge_of_legends_pings_timespan"] = "hidden"
        data["channel_rangliste_chart"] = channel_leaderboard(cur)
        data["spieleranzahl_text"] = user_count(cur)
        data["spieleranzahl_difference"] = "hidden"
        data["spieleranzahl_timespan"] = "hidden"
        data["spieler_rangliste_chart"] = user_leaderboard(cur)
    elif (timespan == "letzte30Tage"):
        print("Letzte 30 Tage!")
        data["gesendete_nachrichten_text"] = messages_count(cur, "letzte30Tage")
        data["gesendete_nachrichten_difference"] = messages_count(cur, "letzte30Tage") - messages_count(cur, "letzte30TageDifference")
        data["gesenedte_nachrichten_timespan"] = "visible"
        data["nachrichten_pro_tag_text"] = messages_average(cur, "letzte30Tage")
        data["nachrichten_pro_tag_chart"] = messages_average_chart_day(cur, "'-30 days'")
        data["aktivität_nach_wochentage_chart"] = messages_per_weekday(cur, "letzte30Tage")
        data["aktivität_nach_stunden_chart"] = messages_per_one_day(cur, "letzte30Tage")
        data["leauge_of_legends_pings_text"] = lol_pings(cur, "letzte30Tage")
        data["leauge_of_legends_pings_difference"] = lol_pings(cur, "letzte30Tage") - lol_pings(cur, "letzte30TageDifference")
        data["leauge_of_legends_pings_timespan"] = "visible"
        data["channel_rangliste_chart"] = channel_leaderboard(cur, "letzte30Tage")
        data["spieleranzahl_text"] = user_count(cur)
        data["spieleranzahl_difference"] = user_count(cur) - user_count(cur, "letzte30TageDifference")
        data["spieleranzahl_timespan"] = "visible"
        data["spieler_rangliste_chart"] = user_leaderboard(cur, "letzte30Tage")
    elif (timespan == "letzte7Tage"):
        print("Letzte 7 Tage!")
        data["gesendete_nachrichten_text"] = messages_count(cur, "letzte7Tage")
        data["gesendete_nachrichten_difference"] = messages_count(cur, "letzte7Tage") - messages_count(cur, "letzte7TageDifference")
        data["gesenedte_nachrichten_timespan"] = "visible"
        data["nachrichten_pro_tag_text"] = messages_average(cur, "letzte7Tage")
        data["nachrichten_pro_tag_chart"] = messages_average_chart_day(cur, "'-6 days'")
        data["aktivität_nach_wochentage_chart"] = messages_per_weekday(cur, "letzte7Tage")
        data["aktivität_nach_stunden_chart"] = messages_per_one_day(cur, "letzte7Tage")
        data["leauge_of_legends_pings_text"] = lol_pings(cur, "letzte7Tage")
        data["leauge_of_legends_pings_difference"] = lol_pings(cur, "letzte7Tage") - lol_pings(cur, "letzte7TageDifference")
        data["leauge_of_legends_pings_timespan"] = "visible"
        data["channel_rangliste_chart"] = channel_leaderboard(cur, "letzte7Tage")
        data["spieleranzahl_text"] = user_count(cur)
        data["spieleranzahl_difference"] = user_count(cur) - user_count(cur, "letzte7TageDifference")
        data["spieleranzahl_timespan"] = "visible"
        data["spieler_rangliste_chart"] = user_leaderboard(cur, "letzte7Tage")
    else: 
        print("Something gone wrong with selecting the timespan!")
    close_db()
    return data