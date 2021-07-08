from flask import Flask, render_template, json
import random
import ctypes
app = Flask(__name__)

gen_rand = 0;

@app.route('/update_gen', methods=['POST'])
def updatedecimal():
    gen_rand = ctypes.CDLL('./library.so').generate_int()
    x = {
        "value" : gen_rand
    }
    return json.dumps(x)

@app.route('/')
def homepage():
    return render_template('index.html', x = gen_rand)

app.run()