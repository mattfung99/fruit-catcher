function powerup(width, height, x, y, powerup_type, speed_type) {
    this.location = canvas_surface;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = speed_type;
    this.x_pos = x;
    this.y_pos = y;
    this.powerup_type = powerup_type;
    this.check_bounds = function() {
        return check_bounds(this);
    }
    this.check_caught = function() {
        return check_caught(this);
    }
    this.img_type = function() {
        switch (this.powerup_type) {
            case 0:
                return img_energy;
            case 1:
                return img_life;
            case 2:
                return img_nuclear;
        }
    }
    this.update_speed = function() {
        update_speed(this);
    }
    this.update_movement = function() {
        update_movement(this, this.img_type());
    }
}
