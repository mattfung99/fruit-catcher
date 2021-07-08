from flask import Flask, render_template, json
import random
import ctypes
app = Flask(__name__)

random_decimal = 1;

@app.route('/update_decimal', methods=['POST'])
def updatedecimal():
    random_decimal = ctypes.CDLL('./library.so').generate_int()
    x = {
        "value" : random_decimal
    }
    return json.dumps(x)

@app.route('/')
def homepage():
    return render_template('index.html', x = random_decimal)

app.run()