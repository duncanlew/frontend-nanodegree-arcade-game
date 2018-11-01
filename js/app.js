// Constants that are used for the
// starting location and movements of the player.
// Movement of the player is performed in
// increments in either the X or Y direction.
const incrementX = 101;
const incrementY = 83;
const startLocationXPlayer = 202;
const startLocationYPlayer = 50 + (4 * 83);
const startLocationXEnemy = -101;
const boundaryWater = 50;
const maxSpeed = 600;
const minSpeed = 100;

var player;
var allEnemies;

function initializeObjects() {
    player = new Player();
    allEnemies = [new Enemy(50),
        new Enemy(50 + 83),
        new Enemy(50 + 2 * 83)
    ];
}

function getRandomSpeed() {
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
}

var Enemy = function (y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = startLocationXEnemy;
    this.y = y;
    this.speed = getRandomSpeed();
};

Enemy.prototype.resetGameIfCollisionDetected = function () {
    if (Math.abs(this.y - player.y) < incrementY) {
        if (Math.abs(this.x - player.x) <= 0.75 * incrementX) {
            console.log("Collision!");
            initializeObjects();
        }
    }
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    this.y = this.y;
    this.resetGameIfCollisionDetected();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = startLocationXPlayer;
    this.y = startLocationYPlayer;
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
    this.x = startLocationXPlayer;
    this.y = startLocationYPlayer;
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

initializeObjects();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});