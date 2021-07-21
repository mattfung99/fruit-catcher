"use strict";

let ctx;
let img_background = new Image(),
    background_width = 480,
    background_height = 800,
    background_x = 0,
    background_y = 0,
    img_width,
    img_height;
img_background.src = "/static/asset/background.jpg";

let img_bucket = new Image(),
    bucket_width = 80,
    bucket_height = 83,
    bucket_x = (background_width / 2) - (bucket_width / 2),
    bucket_y = 650,
    player_bucket,
    player_list = new Array();
img_bucket.src = "/static/asset/bucket.png";

let test_queue = new Queue();
let data_handler = {};

let canvas_surface = {
    canvas: document.createElement("canvas"), initialize_game: function () {
        this.canvas.width = background_width;
        this.canvas.height = background_height;
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

function onload_setup() {
    img_width = img_background.width;
    img_height = img_background.height;
    canvas_surface.initialize_game();
    player_bucket = new create_bucket(bucket_width, bucket_height, bucket_x, bucket_y);
    player_list.push(player_bucket);
    console.log("Current Bucket: " + player_list);
}

function update_canvas() {
    canvas_surface.reset_canvas();
    draw_background();
    for (let p = 0; p < player_list.length; p++) {
        allow_movement(p);
        player_list[p].update_movement();
        player_list[p].update_speed();
    }
}

function draw_background() {
    ctx = canvas_surface.context;
    ctx.drawImage(img_background, background_x, background_y, img_width, img_height);
}

function allow_movement(p) {
    player_list[p].x_speed *= player_list[p].friction;
    if (canvas_surface.keys && canvas_surface.keys[37]) {
        player_list[p].x_speed = -10;
    }
    if (canvas_surface.keys && canvas_surface.keys[39]) {
        player_list[p].x_speed = 10;
    }
}

function in_bounds() {
    for (let p = 0; p < player_list.length; p++) {
        if (player_list[p].x_pos <= 0) {
          player_list[p].x_pos = 0;
        }
        if (player_list[p].x_pos >= 400) {
          player_list[p].x_pos = 400;
        }
    }
}

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
