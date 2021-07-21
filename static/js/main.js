"use strict";

let test_queue = new Queue();
let fruit_queue = new Queue(),
    num_fruits_spawned;
let data_handler = {};
let ctx;

let img_background = new Image(),
    background_width = 480,
    background_height = 800,
    background_x = 0,
    background_y = 0,
    img_width,
    img_height;
img_background.src = "/static/asset/background/background.jpg";

let img_bucket = new Image(),
    bucket_width = 80,
    bucket_height = 83,
    bucket_x = (background_width / 2) - (bucket_width / 2),
    bucket_y = 650,
    player_bucket;
img_bucket.src = "/static/asset/bucket/bucket.png";

let img_heart = new Image();
img_heart.src = "/static/asset/hearts/heart.png";

const falling_obj_width = 32,
      falling_obj_height = 32;

let img_apple = new Image(),
    img_banana = new Image(),
    img_cherry = new Image(),
    img_pear = new Image(),
    img_pineapple = new Image(),
    img_strawberry = new Image();
let list_fruit = new Array();
img_apple.src = "/static/asset/fruits/apple.png";
img_banana.src = "/static/asset/fruits/banana.png";
img_cherry.src = "/static/asset/fruits/cherry.png";
img_pear.src = "/static/asset/fruits/pear.png";
img_pineapple.src = "/static/asset/fruits/pineapple.png";
img_strawberry.src = "/static/asset/fruits/strawberry.png";

let img_cross = new Image(),
    img_energy = new Image(),
    img_life = new Image(),
    img_nuclear = new Image();
let list_powerup = new Array();
img_cross.src = "/static/asset/powerup/item_cross.png";
img_energy.src = "/static/asset/powerup/item_energy.png";
img_life.src = "/static/asset/powerup/item_life.png";
img_nuclear.src = "/static/asset/powerup/item_nuclear.png";

let img_bomb = new Image(),
    img_skull = new Image();
let list_punishment = new Array();
img_bomb.src = "/static/asset/punishment/bomb.png";
img_skull.src = "/static/asset/punishment/skull.png";

/**
const falling_obj_type = {
    APPLE: "apple",
    BANANA: "banana",
    CHERRY: "cherry",
    PEAR: "pear",
    PINEAPPLE: "pineapple",
    STRAWBERRY: "strawberry",
    CROSS: "cross",
    ENERGY: "energy",
    LIFE: ""
}
*/

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
    player_bucket = new bucket(bucket_width, bucket_height, bucket_x, bucket_y);

    list_fruit.push(new fruit(falling_obj_width, falling_obj_height, (background_width / 2) - (falling_obj_width / 2), -32, 0, img_apple));
    console.log("current fruits: " + list_fruit);
}

function update_canvas() {
    canvas_surface.reset_canvas();
    draw_background();
    player_bucket.allow_movement();
    player_bucket.update_movement();
    player_bucket.display_health();
    player_bucket.update_speed();

    for (let i = 0; i < list_fruit.length; i++) {
        list_fruit[i].allow_movement();
        list_fruit[i].update_movement();
        list_fruit[i].update_speed();
        if (list_fruit[i].check_bounds()) {
            list_fruit.splice(i, 1);
            console.log("current fruits: " + list_fruit);
        }
    }
}

function draw_background() {
    ctx = canvas_surface.context;
    ctx.drawImage(img_background, background_x, background_y, img_width, img_height);
}

$(document).ready(function () {
    // Test
    get_def_data();

    let timer = window.setInterval(function () {
        get_gen_fruits()
    }, 1)

    function get_gen_fruits() {
        $.ajax({
            url: "/gen_fruits",
            type: "POST",
            dataType: "json",
            success: function (data) {
                test_queue.enqueue(data);
                if (test_queue.len() == 10) {
                    clearInterval(timer);
                    console.log(test_queue);
                }
            }
        });
    }

    function get_def_data() {
        $.ajax({
            url: "/get_def_data",
            type: "POST",
            dataType: "json",
            success: function (data) {
                data_handler = data;
                console.log(data_handler);
                document.getElementById("test-output").innerHTML = "Success, the passed data is: " + data_handler.highscore;
            }
        });
    }

    $('#make-ajax').click(function () {
        data_handler.highscore += 1;
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
                console.log(data.highscore);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
