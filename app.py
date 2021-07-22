from flask import Flask, render_template, json, request
from flask_cors import CORS, cross_origin
import random
import ctypes
import io
import os
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

gen_rand = 0;

@app.route('/gen_fruits', methods=['POST'])
def gen_fruits():
    return gen_int(0, 6, "fruit")

@app.route('/gen_fruits_speed', methods=['POST'])
def gen_fruits_speed():
    return gen_int(1, 3, "speed")

@app.route('/gen_fruits_xpos', methods=['POST'])
def gen_fruits_xpos():
    return gen_int(0, 449, "xpos")

@app.route('/gen_powerups', methods=['POST'])
def gen_powerups():
    return gen_int(0, 3, "powerup")

@app.route('/gen_powerups_speed', methods=['POST'])
def gen_powerups_peed():
    return gen_int(3, 5, "speed")

@app.route('/gen_powerups_xpos', methods=['POST'])
def gen_powerups_xpos():
    return gen_int(0, 449, "xpos")

@app.route('/gen_punishments', methods=['POST'])
def gen_punishments():
    return gen_int(0, 2, "punishment")

@app.route('/gen_punishments_speed', methods=['POST'])
def gen_punishments_peed():
    return gen_int(3, 5, "speed")

@app.route('/gen_punishments_xpos', methods=['POST'])
def gen_punishments_xpos():
    return gen_int(0, 449, "xpos")

def gen_int(min, max, type):
    gen_rand = ctypes.CDLL('./library.so').generate_int(ctypes.c_int(min), ctypes.c_int(max))
    obj = {
        type : gen_rand
    }
    return json.dumps(obj)

@app.route('/get_def_data', methods=['POST'])
def get_def_data():
    if not os.path.exists("./json/def_data.json"):
        with io.open(os.path.join('./json/', "def_data.json"), 'w') as db_file:
            db_file.write(json.dumps({
                "highscore" : 0
            }))
    return load_def_data()

def load_def_data():
    with open("./json/def_data.json") as json_file:
        return json.load(json_file)

@app.route('/up_def_data', methods=['POST'])
@cross_origin()
def update_def_data():
    json_data = request.get_json();
    with open('./json/def_data.json', 'r+') as json_file:
        json_file.seek(0)
        json_file.write(json.dumps(json_data))
        json_file.truncate()
        return json.dumps({'success': True}), 200, {'ContentType':'application/json'}

@app.route('/')
def homepage():
    return render_template('index.html', x = gen_rand)

app.run()
