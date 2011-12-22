function Rect() {
    this.init.apply(this, arguments);
}
;

Rect.prototype.init = function (color, x, y, width, height) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

Rect.prototype.draw = function () {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
};

Rect.prototype.isCollision = function (withObject) {
    if (this.x + this.width > withObject.x && this.x < withObject.x + withObject.width && this.y + this.height > withObject.y && this.y < withObject.y + withObject.height) {
        return true;
    } else {
        return false;
    }
};
Rect.prototype.onCollision = function () {};

Rect.prototype.visible = true;