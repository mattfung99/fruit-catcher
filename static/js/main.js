"use strict";

let test_queue = new Queue();
let queue_fruit = new Queue(),
    num_fruits_spawned = 0,
    num_fruits_queued = 0,
    flag_fruit_gen = true;
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

const FALLING_OBJ_WIDTH = 32,
      FALLING_OBJ_HEIGHT = 32,
      FALLING_OBJ_Y_POS = -32;

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

let curr_powerup,
    curr_punishment;

let spawn_fruit = {
    curr_fruit: 0,
    curr_speed: 0,
    curr_xpos: 0
};

let spawn_powerup = {
    curr_powerup: 0,
    curr_speed: 0,
    curr_xpos: 0
};

let spawn_punishment = {
    curr_punishment: 0,
    curr_speed: 0,
    curr_xpos: 0
};

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
    get_def_data();
    img_width = img_background.width;
    img_height = img_background.height;
    canvas_surface.initialize_game();
    player_bucket = new bucket(bucket_width, bucket_height, bucket_x, bucket_y);
    queue_fruits();
}

function update_canvas() {
    canvas_surface.reset_canvas();
    draw_background();
    player_bucket.allow_movement();
    player_bucket.update_movement();
    player_bucket.display_health();
    player_bucket.update_speed();

    generate_fruits();
    // console.log(list_fruit);
    // console.log("num fruits spawned: " + num_fruits_spawned);

    for (let i = 0; i < list_fruit.length; i++) {
        list_fruit[i].update_movement();
        list_fruit[i].update_speed();
        if (list_fruit[i].check_bounds()) {
            list_fruit.splice(i, 1);
            num_fruits_spawned--;
        }
    }
}

function draw_background() {
    ctx = canvas_surface.context;
    ctx.drawImage(img_background, background_x, background_y, img_width, img_height);
}

function queue_fruits() {
    let i = 0;
    let timer = setInterval(function() {
        if (i == 150) {
            clearInterval(timer);
        }
        get_gen_fruits();
        get_gen_fruits_speed();
        get_gen_fruits_xpos();
        setTimeout(function() {
            queue_fruit.enqueue(new fruit(
                FALLING_OBJ_WIDTH,
                FALLING_OBJ_HEIGHT,
                spawn_fruit.curr_xpos,
                FALLING_OBJ_Y_POS,
                spawn_fruit.curr_fruit,
                spawn_fruit.curr_speed)
            );
            num_fruits_queued++;
        }, 50);
        i++;
    }, 50);
}

function generate_fruits() {
    if (flag_fruit_gen && queue_fruit.len() >= 1) {
        flag_fruit_gen = false;
        list_fruit.push(queue_fruit.dequeue());
        num_fruits_spawned++;
        setTimeout(function() {
            flag_fruit_gen = true;
        }, 2000);
    }
}
