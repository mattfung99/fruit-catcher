function check_bounds(context) {
    return context.y_pos >= 800;
}

function check_caught(context) {
    return (context.y_pos + context.height >= player_bucket.y_pos + 7) &&
           (context.x_pos + context.width >= player_bucket.x_pos) &&
           (context.x_pos <= player_bucket.x_pos + player_bucket.width);
}

function update_speed(context) {
    context.x_pos += context.x_speed;
    context.y_pos += context.y_speed;
}

function update_movement(context, img_type) {
    ctx = canvas_surface.context;
    ctx.drawImage(img_type, context.x_pos, context.y_pos);
}
