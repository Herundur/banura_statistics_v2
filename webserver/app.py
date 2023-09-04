from flask import Flask, render_template, request, redirect, jsonify
import sqlite3
from handle_data.connect_database import *
from handle_data.bundle_data import load_data
from handle_data.get_user import *
app = Flask(__name__, static_url_path='/static')

app.config["TEMPLATES_AUTO_RELOAD"] = True
@app.route("/", methods=["GET"])
def index():
    return redirect('/dashboard?zeitspanne=seitBeginn')

@app.route("/dashboard", methods=["GET"])
def dashboard():
    selected_option = request.args.get('zeitspanne')
    data = load_data(selected_option)
    print(data)
    return render_template("dashboard.html", selected_option=selected_option, data=data)

@app.route('/search', methods=['GET'])
def search_users():
    query = request.args.get('q')
    results = dropdown_suggestions(query)
    return jsonify(results)

@app.route('/nutzerprofil', methods=['GET'])
def user_profile():
    query = request.args.get('q')
    user_id = get_user_id(query)
    if(not isinstance(user_id, int)):
        return render_template("error_profile.html", name=user_id)
    data = get_user_data(user_id)
    print(data)
    return render_template("profile.html", data=data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)#debug=True