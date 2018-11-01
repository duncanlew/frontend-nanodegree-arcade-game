// Constants that are used for the
// starting location and movement of the player.
// Movement of the player is performed in
// increments in either the X or Y direction.
const incrementX = 101;
const incrementY = 83;
const startingX = 202;
const startingY = 50 + (4 * 83);
const boundaryWater = 50;

var Enemy = function (x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 10;
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    this.y = this.y;
    //HANDLE COLLISION WITH PLAYER
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = startingX;
    this.y = startingY;
    this.deltaX = 0;
    this.deltaY = 0;
}
Player.prototype.update = function (deltaX, deltaY) {
    this.x += this.deltaX;
    this.y += this.deltaY;
    this.deltaX = 0;
    this.deltaY = 0;
    this.resetLocationIfPlayerWins();
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
    this.x = startingX;
    this.y = startingY;
}

Player.prototype.canPlayerMoveLeft = function () {
    if (this.x < incrementX) {
        return false;
    }
    return true;
}

Player.prototype.canPlayerMoveRight = function () {
    if (this.x + incrementX >= canvas.width) {
        return false;
    }
    return true;
}

Player.prototype.canPlayerMoveInDown = function () {
    if (this.y + incrementY > 382) {
        return false;
    }
    return true;
}

Player.prototype.resetLocationIfPlayerWins = function () {
    if (this.y < boundaryWater) {
        this.reset();
    }
}

Player.prototype.handleInput = function (inputKeyString) {
    console.log("Player x: " + this.x);
    console.log("Player y: " + this.y);
    switch (inputKeyString) {
        case 'left':
            if (this.canPlayerMoveLeft()) {
                this.deltaX = -incrementX;
            }
            break;

        case 'up':
            this.deltaY = -incrementY;
            break;

        case 'right':
            if (this.canPlayerMoveRight()) {
                this.deltaX = incrementX;
            }
            break;

        case 'down':
            if (this.canPlayerMoveInDown()) {
                this.deltaY = incrementY;
            }
            break;
    }
};

var player = new Player();
var allEnemies = [new Enemy(-101, 50),
    new Enemy(0, 50 + 83),
    new Enemy(0, 50 + 2 * 83)
];

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});