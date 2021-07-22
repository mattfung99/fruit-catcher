"use strict";

let queue_fruit = new Queue(),
    num_fruits_spawned = 0,
    num_fruits_queued = 0,
    flag_fruit_gen = true;
let queue_powerup = new Queue(),
    num_powerups_spawned = 0,
    num_powerups_queued = 0,
    flag_powerup_gen = true;
let queue_punishment = new Queue(),
    num_punishments_spawned = 0,
    num_punishments_queued = 0,
    flag_punishment_gen = true;

let data_handler = {},
    player_score = 0;
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

let img_energy = new Image(),
    img_life = new Image(),
    img_nuclear = new Image();
let list_powerup = new Array();
img_energy.src = "/static/asset/powerup/item_energy.png";
img_life.src = "/static/asset/powerup/item_life.png";
img_nuclear.src = "/static/asset/powerup/item_nuclear.png";

let img_bomb = new Image(),
    img_skull = new Image();
let list_punishment = new Array();
img_bomb.src = "/static/asset/punishment/bomb.png";
img_skull.src = "/static/asset/punishment/skull.png";

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

let sound_caught = new create_sound("/static/asset/sound/beep1.wav");

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
    update_score();
    get_def_data();
    img_width = img_background.width;
    img_height = img_background.height;
    canvas_surface.initialize_game();
    player_bucket = new bucket(bucket_width, bucket_height, bucket_x, bucket_y);
    queue_fruits();
    queue_powerups();
    queue_punishments();
}

function update_canvas() {
    canvas_surface.reset_canvas();
    draw_background();
    player_bucket.allow_movement();
    player_bucket.update_movement();
    player_bucket.display_health();
    player_bucket.update_speed();
    generate_fruits();
    for (let i = 0; i < list_fruit.length; i++) {
        list_fruit[i].update_movement();
        list_fruit[i].update_speed();
        if (list_fruit[i].check_bounds()) {
            remove_fruit(i);
            player_bucket.hearts--;
        }
        if (list_fruit[i].check_caught()) {
            sound_caught.play();
            remove_fruit(i);
            player_score++;
            update_score();
        }
    }

    generate_powerups();
    for (let i = 0; i < list_powerup.length; i++) {
        list_powerup[i].update_movement();
        list_powerup[i].update_speed();
        if (list_powerup[i].check_bounds()) {
            remove_powerup(i);
        }
        if (list_powerup[i].check_caught()) {
            // sound_caught.play();
            remove_powerup(i);
        }
    }

    generate_punishments();
    for (let i = 0; i < list_punishment.length; i++) {
        list_punishment[i].update_movement();
        list_punishment[i].update_speed();
        if (list_punishment[i].check_bounds()) {
            remove_punishment(i);
        }
        if (list_punishment[i].check_caught()) {
            // sound_caught.play();
            remove_punishment(i);
        }
    }
}

function draw_background() {
    ctx = canvas_surface.context;
    ctx.drawImage(img_background, background_x, background_y, img_width, img_height);
}

function queue_fruits() {
    let i = 0;
    let timer_fruit = setInterval(function() {
        if (i == 1000) {
            clearInterval(timer_fruit);
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

function queue_powerups() {
    let i = 0;
    let timer_powerup = setInterval(function() {
        if (i == 50) {
            clearInterval(timer_powerup);
        }
        get_gen_powerups();
        get_gen_powerups_speed();
        get_gen_powerups_xpos();
        setTimeout(function() {
            queue_powerup.enqueue(new powerup(
                FALLING_OBJ_WIDTH,
                FALLING_OBJ_HEIGHT,
                spawn_powerup.curr_xpos,
                FALLING_OBJ_Y_POS,
                spawn_powerup.curr_powerup,
                spawn_powerup.curr_speed)
            );
            num_powerups_queued++;
        }, 50);
        i++;
    }, 50);
}

function queue_punishments() {
    let i = 0;
    let timer_punishment = setInterval(function() {
        if (i == 50) {
            clearInterval(timer_punishment);
        }
        get_gen_punishments();
        get_gen_punishments_speed();
        get_gen_punishments_xpos();
        setTimeout(function() {
            queue_punishment.enqueue(new punishment(
                FALLING_OBJ_WIDTH,
                FALLING_OBJ_HEIGHT,
                spawn_punishment.curr_xpos,
                FALLING_OBJ_Y_POS,
                spawn_punishment.curr_punishment,
                spawn_punishment.curr_speed)
            );
            num_punishments_queued++;
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
        }, 1500);
    }
}

function generate_powerups() {
    if (flag_powerup_gen && queue_powerup.len() >= 1) {
        flag_powerup_gen = false;
        setTimeout(function() {
            list_powerup.push(queue_powerup.dequeue());
            num_powerups_spawned++;
        }, 2000);
        setTimeout(function() {
            flag_powerup_gen = true;
        }, 20000);
    }
}

function generate_punishments() {
    if (flag_punishment_gen && queue_punishment.len() >= 1) {
        flag_punishment_gen = false;
        setTimeout(function() {
            list_punishment.push(queue_punishment.dequeue());
            num_punishments_spawned++;
        }, 3000);
        setTimeout(function() {
            flag_punishment_gen = true;
        }, 10000);
    }
}

function remove_fruit(i) {
    list_fruit.splice(i, 1);
    num_fruits_spawned--;
}

function remove_powerup(i) {
    list_powerup.splice(i, 1);
    num_powerups_spawned--;
}

function remove_punishment(i) {
    list_punishment.splice(i, 1);
    num_punishments_spawned--;
}

function update_score() {
    document.getElementById("score").innerHTML = "Player Score: " + player_score;
}

function create_sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
}
