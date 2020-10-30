var GameModel = function (player, objectList) {
    this.player = player;
    this.ObjectList = objectList;
    this.count = 100;
    this.updateEvent = new Event(this);
}

GameModel.prototype.update = function () {
    this.updateEvent.notify();
}

GameModel.prototype.playerMove = function (direction) {
    switch (direction) {
        case Direction.Left:
            this.player.moveLeft();
            break;
        case Direction.Right:
            this.player.moveRight();
            break;
        case Direction.Up:
            this.player.moveUp();
            break;
        case Direction.Down:
            this.player.moveDown();
            break;
    }
}

GameModel.prototype.generateObject = function (scene, id) {
    return new GameObject(
        id,
        helper.randomNumber(scene.offsetWidth, scene.offsetWidth + 50),
        helper.randomNumber(0, scene.offsetHeight),
        helper.randomNumber(10, 50),
        helper.randomNumber(10, 50),
        3
    );
}

GameModel.prototype.isObjectOutOfScene = function (object) {
    return object.x + object.w < 0;
}

GameModel.prototype.intersect = function (a, b) {
    return (a.x <= b.x + b.w &&
        b.x <= a.x + a.w &&
        a.y <= b.y + b.h &&
        b.y <= a.y + a.h);
}

GameModel.prototype.loseCount = function () {
    this.count--;
}

GameModel.prototype.isOver = function () {
    return this.count <= 0;
}

const Direction = {
    Left: "Left",
    Right: "Right",
    Up: "Up",
    Down: "Down"
}
