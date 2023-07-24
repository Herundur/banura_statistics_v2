from flask import Flask, render_template, request, redirect
import sqlite3
from handle_data.bundle_data import load_data
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
    return render_template("index.html", selected_option=selected_option, data=data)

if __name__ == "__main__":
    app.run(debug=True)