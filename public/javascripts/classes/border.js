function Border() {
    this.visible = false;
    this.init.apply(this, arguments);
};

Border.prototype = new Rect();

Border.prototype.onCollision = function(ball) {
    this.player.lives--;
    ball.x = this.player.x + ball.width;
    ball.y = this.player.y + ball.height;
    ball.dx = 0;
    ball.dy = 0;
};