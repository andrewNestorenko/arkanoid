function Game() {
    this.objects = [];
}

Game.prototype.addObject = function(object) {
    this.objects.push(object);
    return this;
};