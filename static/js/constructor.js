function create_bucket(width, height, x, y) {
    this.location = canvas_surface;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.friction = 0.91;
    this.x_pos = x;
    this.y_pos = y;
    this.update_speed = function() {
      this.x_pos += this.x_speed;
      in_bounds();
    }
    this.update_movement = function() {
        ctx = canvas_surface.context;
        ctx.drawImage(img_bucket, this.x_pos, this.y_pos);
    }
}
