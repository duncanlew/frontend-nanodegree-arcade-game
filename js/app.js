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
    this.x = 202;
    this.y = 50 + (4*83);
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
            this.deltaX = -101;
            break;

        case 'up':
            this.deltaY = -83;
            break;

        case 'right':
            this.deltaX = 101;
            break;

        case 'down':
            this.deltaY = 83;
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
