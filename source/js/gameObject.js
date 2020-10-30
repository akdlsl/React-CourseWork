var GameObject = function(id, x, y, w, h, velocity, isPlayer) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = velocity;

    if (id) {
        this.guid = id;
        return;
    }
    this.guid = helper.getGuid();
    var mainScene = helper.getMainScene();
    mainScene.innerHTML += `<span id="${this.guid}" class=${isPlayer ? "scene__object" : "scene__player"}></span>`;
}

GameObject.prototype.render = function() {
    const object = document.getElementById(this.guid);
    object.style.top = `${this.y}px`;
    object.style.left = `${this.x}px`;
    object.style.height = `${this.h}px`;
    object.style.width = `${this.w}px`;
}

GameObject.prototype.moveLeft = function () {
    this.x -= this.velocity;
}

GameObject.prototype.moveRight = function () {
    this.x += this.velocity;
}

GameObject.prototype.moveUp = function () {
    this.y -= this.velocity;
}

GameObject.prototype.moveDown = function () {
    this.y += this.velocity;
}
