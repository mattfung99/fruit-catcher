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

@app.route('/gen_int', methods=['POST'])
def gen_int():
    gen_rand = ctypes.CDLL('./library.so').generate_int(ctypes.c_int(0), ctypes.c_int(100))
    x = {
        "value" : gen_rand
    }
    return json.dumps(x)

@app.route('/get_def_data', methods=['POST'])
def get_def_data():
    if not os.path.exists("./json/def_data.json"):
        with io.open(os.path.join('./json/', "def_data.json"), 'w') as db_file:
            db_file.write(json.dumps({
                "score" : 0 
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