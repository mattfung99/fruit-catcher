function fruit(width, height, x, y, fruit_type, speed_type) {
    this.location = canvas_surface;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = speed_type;
    this.x_pos = x;
    this.y_pos = y;
    this.fruit_type = fruit_type;
    this.check_bounds = function() {
        return this.y_pos >= 800;
    }
    this.img_type = function() {
        switch (this.fruit_type) {
            case 0:
                return img_apple;
            case 1:
                return img_banana;
            case 2:
                return img_cherry;
            case 3:
                return img_pear;
            case 4:
                return img_pineapple;
            case 5:
                return img_strawberry;
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
