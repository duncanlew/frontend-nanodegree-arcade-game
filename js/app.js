// Constants that defined for the 
// locations, boundaries and other properties of the game
const incrementX = 101;
const incrementY = 83;
const startLocationXPlayer = 202;
const startLocationYPlayer = 50 + (4 * 83);
const startLocationXEnemy = -101;
const collisionSensitivity = 0.70;
const boundaryWater = 50;
const boundaryBottomBoard = 382;
const maxSpeed = 600;
const minSpeed = 100;
const numberOfLanes = 3

var player;
var allEnemies;

// Get the lane number in which the enemy will appear
// The lane numbers that can be chosen are 0, 1 and 2. 
function getLaneNumber() {
    return Math.floor(Math.random() * numberOfLanes)
}

// Initialize the player and enemy objects
// Used for starting/resetting the game
function initializeObjects() {
    player = new Player();
    allEnemies = [new Enemy(), new Enemy(), new Enemy()];
}

// Return a random number between minSpeed and maxSpeed.
// This is used for asigning a random speed to an Enemy object
function getRandomSpeed() {
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
}

var Enemy = function () {
    this.sprite = 'images/enemy-bug.png';
    this.x = startLocationXEnemy;
    this.y = boundaryWater + getLaneNumber() * incrementY;
    this.speed = getRandomSpeed();
};

// If the enemy object moves off screen, its location and
// its speed will get regenerated
Enemy.prototype.resetEnemyLocationIfOffScreen = function () {
    if (this.x >= canvas.width) {
        this.x = startLocationXEnemy;
        this.y = boundaryWater + getLaneNumber() * incrementY;
        this.speed = getRandomSpeed();
    }
}

// If the enemy object collides with the player object,
// the game will get resetted.
Enemy.prototype.resetGameIfCollisionDetected = function () {
    if (Math.abs(this.y - player.y) < incrementY) {
        if (Math.abs(this.x - player.x) <= collisionSensitivity * incrementX) {
            initializeObjects();
        }
    }
};

// When the enemy position is updated, check whether
// a collision has occured with the player object
// and whether the enemy object is off screen
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    this.y = this.y;
    this.resetGameIfCollisionDetected();
    this.resetEnemyLocationIfOffScreen();
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

// Reset the location of the player object.
// This happens only when the player has won.
Player.prototype.reset = function () {
    this.x = startLocationXPlayer;
    this.y = startLocationYPlayer;
}

// Check whether the player object can move left
// This is done to prevent player from moving off screen
Player.prototype.canPlayerMoveLeft = function () {
    if (this.x < incrementX) {
        return false;
    }
    return true;
}

// Check whether the player object can move right
// This is done to prevent player from moving off screen
Player.prototype.canPlayerMoveRight = function () {
    if (this.x + incrementX >= canvas.width) {
        return false;
    }
    return true;
}

// Check whether the player object can move down
// This is done to prevent player from moving off screen
Player.prototype.canPlayerMoveInDown = function () {
    if (this.y + incrementY > boundaryBottomBoard) {
        return false;
    }
    return true;
}

// Check whether the player object can move up
// This is done to prevent player from moving off screen
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