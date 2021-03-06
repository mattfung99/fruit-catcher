function get_gen_fruits() {
    $.ajax({
        url: "/gen_fruits",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_fruit.curr_fruit = data.fruit
            // console.log("sucess fruit");
        }
    });
}

function get_gen_fruits_speed() {
    $.ajax({
        url: "/gen_fruits_speed",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_fruit.curr_speed = data.speed;
        }
    });
}

function get_gen_fruits_xpos() {
    $.ajax({
        url: "/gen_fruits_xpos",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_fruit.curr_xpos = data.xpos;
        }
    });
}

function get_gen_powerups() {
    $.ajax({
        url: "/gen_powerups",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_powerup.curr_powerup = data.powerup;
        }
    });
}

function get_gen_powerups_speed() {
    $.ajax({
        url: "/gen_powerups_speed",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_powerup.curr_speed = data.speed;
        }
    });
}

function get_gen_powerups_xpos() {
    $.ajax({
        url: "/gen_powerups_xpos",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_powerup.curr_xpos = data.xpos;
        }
    });
}

function get_gen_punishments() {
    $.ajax({
        url: "/gen_punishments",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_punishment.curr_punishment = data.punishment;
        }
    });
}

function get_gen_punishments_speed() {
    $.ajax({
        url: "/gen_punishments_speed",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_punishment.curr_speed = data.speed;
        }
    });
}

function get_gen_punishments_xpos() {
    $.ajax({
        url: "/gen_punishments_xpos",
        type: "POST",
        dataType: "json",
        success: function (data) {
            spawn_punishment.curr_xpos = data.xpos;
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
            console.clear();
            console.log("highscore successfully loaded!");
            document.getElementById("highscore").innerHTML = "All-Time Highscore: " + data_handler.highscore;
        }
    });
}

function update_def_data() {
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
}
