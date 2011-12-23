function Player() {
    this.lives = 10;
    this.init.apply(this, arguments);
};
Player.prototype = new Rect();

Player.prototype.isReal = false;