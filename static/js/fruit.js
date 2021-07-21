function create_fruit(width, height, x, y, type, img_type) {
    this.location = canvas_surface;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
    this.x_pos = x;
    this.y_pos = y;
    this.type = type;
    this.update_speed = function() {
        this.x_pos += this.x_speed;
        this.y_pos += this.y_speed;
    }
    this.update_movement = function() {
        update_movement(this, img_type);
    }
}
