from flask import Flask, render_template, json
import random
import ctypes
import io
import os
app = Flask(__name__)

gen_rand = 0;

@app.route('/gen_int', methods=['POST'])
def gen_int():
    gen_rand = ctypes.CDLL('./library.so').generate_int()
    x = {
        "value" : gen_rand
    }
    return json.dumps(x)

@app.route('/def_data', methods=['POST'])
def def_data():
    if not os.path.exists("def_data.json"):
        with io.open(os.path.join('./', "def_data.json"), 'w') as db_file:
            db_file.write(json.dumps({
                "score" : 0 
            }))
    return get_def_data()

def get_def_data():
    with open("def_data.json") as json_file:
        return json.load(json_file)

@app.route('/')
def homepage():
    return render_template('index.html', x = gen_rand)

app.run()