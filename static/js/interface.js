function update_movement(context, img_type) {
    ctx = canvas_surface.context;
    ctx.drawImage(img_type, context.x_pos, context.y_pos);
}

function allow_movement(context) {
    switch (context.speed_type) {
        case 0:
            context.y_speed = 5;
            break;
    }
}

function create_wave(obj_type, num_enemy) {
    this.obj_type = obj_type;
}
