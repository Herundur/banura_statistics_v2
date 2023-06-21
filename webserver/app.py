from flask import Flask, render_template, request
import sqlite3
from handle_data.read_database import *

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route("/", methods=["GET"])
def index():
    open_db()
    number_of_messages_and_startdate = message_count_start_date()
    close_db()
    return render_template("index.html", messages_count_start_date=number_of_messages_and_startdate, placeholder=100)

if __name__ == "__main__":
    app.run(debug=True)