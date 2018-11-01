// Constants that are used for the
// starting location and movement of the player.
// Movement of the player is performed in
// increments in either the X or Y direction.
const incrementX = 101;
const incrementY = 83;
const startingX = 202;
const startingY = 50 + (4*83);

var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 10;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
    this.y = this.y;
    //HANDLE COLLISION WITH PLAYER
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = startingX;
    this.y = startingY;
    this.deltaX = 0;
    this.deltaY = 0;
}
Player.prototype.update = function(deltaX, deltaY) {
    this.x += this.deltaX;
    this.y += this.deltaY;
    this.deltaX = 0;
    this.deltaY = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(inputKeyString) {
    switch(inputKeyString) {
        case 'left':
            this.deltaX = -incrementX;
            break;

        case 'up':
            this.deltaY = -incrementY;
            break;

        case 'right':
            this.deltaX = incrementX;
            break;

        case 'down':
            this.deltaY = incrementY;
            break;
    }
};

var player = new Player();
var allEnemies = [new Enemy(0, 50), 
    new Enemy(0, 50+83), 
    new Enemy(0, 50+2*83)];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
