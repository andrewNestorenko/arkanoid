function Border() {
    this.visible = true;
    this.init.apply(this, arguments);
};

Border.prototype = new Rect();

Border.prototype.onCollision = function(ball) {
    this.player.lives--;
    ball.toPlayer(this.player);
};