"use strict";

let ctx;
let test_queue = new Queue();
let data_handler = {};

let canvas_surface = {
    canvas: document.createElement("canvas"), initialize_game: function () {
        this.canvas.width = 850;
        this.canvas.height = 550;
        this.canvas.style.display = 'inline-block';
        this.canvas.style.position = 'relative';
        this.canvas.id = "canvas-surface";
        document.getElementById("canvas-container").appendChild(canvas_surface.canvas);
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update_canvas, 20);
        window.addEventListener('keydown', function (event) {
            canvas_surface.keys = (canvas_surface.keys || []);
            canvas_surface.keys[event.keyCode] = (event.type == "keydown");
        })
        window.addEventListener('keyup', function (event) {
            canvas_surface.keys[event.keyCode] = (event.type == "keydown");
        })
        window.addEventListener("keydown", function (event) {
            if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
                event.preventDefault();
            }
        }, false);
    },
    reset_canvas: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop_canvas: function () {
        clearInterval(this.interval);
    }
};

$(document).ready(function () {
    // Test
    getDefData();

    let timer = window.setInterval(function () {
        getGenInt()
    }, 500)

    function getGenInt() {
        $.ajax({
            url: "/gen_int",
            type: "POST",
            dataType: "json",
            success: function (data) {
                test_queue.enqueue(data);
                if (test_queue.len() == 5) {
                    clearInterval(timer);
                    console.log(test_queue);
                }
            }
        });
    }

    function getDefData() {
        $.ajax({
            url: "/get_def_data",
            type: "POST",
            dataType: "json",
            success: function (data) {
                data_handler = data;
                console.log(data_handler);
                document.getElementById("test-output").innerHTML = "Success, the passed data is: " + data_handler.score;
            }
        });
    }

    $('#make-ajax').click(function () {
        data_handler.score += 1;
        console.log(data_handler);
        console.log(JSON.stringify(data_handler));
        $.ajax({
            url: "/up_def_data",
            type: "POST",
            data: JSON.stringify(data_handler),
            contentType: 'application/json;charset=UTF-8',
            crossDomain: true,
            dataType: "json",
            success: function (data) {
                console.log(data.score);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

function onload_setup() {
    canvas_surface.initialize_game();
}
