function update_movement(context, img_type) {
    ctx = canvas_surface.context;
    ctx.drawImage(img_type, context.x_pos, context.y_pos);
}
