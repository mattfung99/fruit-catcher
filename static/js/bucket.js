function bucket(width, height, x, y) {
    this.location = canvas_surface;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.friction = 0.91;
    this.x_pos = x;
    this.y_pos = y;
    this.hearts = 3;
    this.allow_movement = function() {
        this.x_speed *= this.friction;
        if (canvas_surface.keys && canvas_surface.keys[37]) {
            this.x_speed = -10;
        }
        if (canvas_surface.keys && canvas_surface.keys[39]) {
            this.x_speed = 10;
        }
    }
    this.display_health = function() {
        ctx = canvas_surface.context;
        for (let i = 1; i <= this.hearts; i++) {
            ctx.drawImage(img_heart, this.x_pos + 3 + i * 15, this.y_pos + 90);
        }
    }
    this.check_bounds = function() {
        if (this.x_pos <= 0) {
            this.x_pos = 0;
        }
        if (this.x_pos >= 400) {
            this.x_pos = 400;
        }
    }
    this.update_speed = function() {
        this.x_pos += this.x_speed;
        this.check_bounds();
    }
    this.update_movement = function() {
        update_movement(this, img_bucket);
    }
}
