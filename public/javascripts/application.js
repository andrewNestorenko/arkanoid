$(function() {

    /**
     * Base canvas variables
     */
    var canvas = document.getElementById("arkanoid")
      , context = canvas.getContext("2d")
      , offsetTop = canvas.offsetTop;

    /**
     * Set context to all Rectangle objects
     */
    Rect.prototype.context = context;

    /**
     * Game objects
     * players, ball, borders
     *
     */
    var layout = new Rect('#000', 0, 0, canvas.width, canvas.height)
      , playerWidth = 1
      , playerHeight = layout.height / 5
      , playerIndent = 10
      , ball = new Rect('#fff', 150, 50, 10, 10)

      , playerLeft = new Player('#fff', playerIndent, (layout.height / 2 - playerHeight / 2), playerWidth, playerHeight)
//      , playerRight = new Player('#fff', (layout.width - 10 - playerWidth), (layout.height / 2 - playerHeight / 2), playerWidth, playerHeight)
          , playerRight = new Player('#fff', (layout.width - playerIndent - playerWidth), playerWidth + playerIndent, playerWidth, layout.height - playerWidth * 2 - playerIndent * 2)
      , playerTop = new Player('#fff', playerWidth + playerIndent, playerIndent, layout.width - playerWidth * 2 - playerIndent * 2, playerWidth)
      , playerBottom = new Player('#fff', playerWidth + playerIndent, layout.height - playerIndent - playerWidth, layout.width - playerWidth * 2 - playerIndent * 2, playerWidth)

      , borderLeft = new Border('#0F0', 0, 0, playerIndent, layout.height)
      , borderRight = new Border('#0F0', (layout.width - playerIndent), 0, playerIndent, layout.height)
      , borderTop = new Border('#F0F', 0, 0, layout.width, playerIndent)
      , borderBottom = new Border('#f0f', 0, layout.width - playerIndent, layout.width, playerIndent);

    /**
     * Assign player to border
     */
    borderLeft.player = playerLeft;
    borderRight.player = playerRight;
    borderTop.player = playerTop;
    borderBottom.player = playerBottom;

    /**
     * If player lose than ball will appeared near this player
     */
    canvas.onclick = function() {
        if (ball.dx == 0 && ball.dy == 0) {
            ball.dx = 5;
            ball.dy = 5;
            ball.draw();
        }
    };

    /**
     * Default ball delta
     * pixel count and side (- or +) where ball will move
     */
    ball.dx = -5;
    ball.dy = -5;

    /**
     * Collision player with ball
     */
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

    /**
     * Ball move
     * check for collision with all object on canvas
     */
    ball.move = function() {
        this.x += this.dx;
        this.y += this.dy;

        for (var i = 0, l = game.objects.length; i < l; i++) {
            if (game.objects[i] != this && game.objects[i].isCollision(this)) {
                game.objects[i].onCollision(this);
            }
        }
    };

    /**
     * binding player to mouse
     * @param e
     */
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

    /**
     * Add all object that in canvas
     */
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