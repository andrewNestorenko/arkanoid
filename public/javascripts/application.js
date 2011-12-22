$(function() {

    var canvas = document.getElementById("arkanoid")
      , context = canvas.getContext("2d")
      , offsetTop = canvas.offsetTop;

    Rect.prototype.context = context;

    var layout = new Rect('#000', 0, 0, canvas.width, canvas.height)
      , playerWidth = 10
      , playerHeight = layout.height / 5
      , ball = new Rect('#fff', 150, 50, 10, 10)

      , playerLeft = new Player('#fff', 10, (layout.height / 2 - playerHeight / 2), playerWidth, playerHeight)
//      , playerRight = new Player('#fff', (layout.width - 10 - playerWidth), (layout.height / 2 - playerHeight / 2), playerWidth, playerHeight)
      , playerRight = new Player('#fff', (layout.width - 10 - playerWidth), 20, playerWidth, layout.height - playerWidth * 2 - 20)
      , playerTop = new Player('#fff', playerWidth + 10, 10, layout.width - playerWidth * 2 - 20, 10)
      , playerBottom = new Player('#fff', playerWidth + 10, layout.width - 20, layout.width - playerWidth * 2 - 20, 10)


      , borderLeft = new Border('#0F0', 0, 0, 10, layout.height)
      , borderRight = new Border('#0F0', (layout.width - 10), 0, playerWidth, layout.height)
      , borderTop = new Border('#F0F', 0, 0, layout.width, 10)
      , borderBottom = new Border('#f0f', 0, layout.width - 10, layout.width, 10);

    borderLeft.player = playerLeft;
    borderRight.player = playerRight;
    borderTop.player = playerTop;
    borderBottom.player = playerBottom;

    canvas.onclick = function() {
        if (ball.dx == 0 && ball.dy == 0) {
            ball.dx = 5;
            ball.dy = 5;
            ball.draw();
        }
    };

    ball.dx = -5;
    ball.dy = -5;

    playerRight.onCollision = function() {
        ball.dx *= -1;
    };

    playerLeft.onCollision = function() {
        ball.dx *= -1;
    };

    playerTop.onCollision = function() {
        ball.dy *= -1;
    };

    playerBottom.onCollision = function() {
        ball.dy *= -1;
    };
    ball.move = function() {
        this.x += this.dx;
        this.y += this.dy;

        for (var i = 0, l = game.objects.length; i < l; i++) {
            if (game.objects[i] != this && game.objects[i].isCollision(this)) {
                game.objects[i].onCollision(this);
            }
        }
    };

    canvas.onmousemove = function(e) {
        var y = e.pageY - offsetTop;
        if (playerLeft.height / 2 + playerLeft.width < y && y < layout.height - playerLeft.height / 2 - playerLeft.width) {
            playerLeft.y = y - playerLeft.height / 2;
        }
    };

    var game = new Game();

    game.redraw = function() {
        ball.move();
        for (var i = 0, l = this.objects.length; i < l; i++) {
            if (this.objects[i].visible && typeof this.objects[i].draw == 'function') {
                this.objects[i].draw();
            }
        }
        setTimeout(function() { game.redraw() }, 25);
    };

    game.addObject(layout)
        .addObject(playerLeft)
        .addObject(playerRight)
        .addObject(playerTop)
        .addObject(playerBottom)
        .addObject(ball)
        .addObject(borderLeft)
        .addObject(borderRight)
        .addObject(borderTop)
        .addObject(borderBottom)
        .redraw();

});