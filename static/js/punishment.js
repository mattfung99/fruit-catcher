function punishment(width, height, x, y, punishment_type, speed_type) {
    this.location = canvas_surface;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = speed_type;
    this.x_pos = x;
    this.y_pos = y;
    this.punishment_type = punishment_type;
    this.check_bounds = function() {
        return check_bounds(this);
    }
    this.check_caught = function() {
        return check_caught(this);
    }
    this.img_type = function() {
        switch (this.punishment_type) {
            case 0:
                return img_bomb;
            case 1:
                return img_skull;
        }
    }
    this.update_speed = function() {
        this.x_pos += this.x_speed;
        this.y_pos += this.y_speed;
    }
    this.update_movement = function() {
        update_movement(this, this.img_type());
    }
}
