function explosion(width, height, x, y, speed_type) {
    this.location = canvas_surface;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = speed_type;
    this.x_pos = x;
    this.y_pos = y;
    this.distance_travelled = 0;
    this.check_bounds = function() {
        return this.distance_travelled == 10;
    }
    this.update_speed = function() {
        update_speed(this);
    }
    this.update_movement = function() {
        update_movement(this, img_explosion);
    }
}
