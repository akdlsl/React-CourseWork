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
    this.mainScene = helper.getMainScene();
    this.mainScene.innerHTML += `<circle id="${this.guid}" fill="${!isPlayer ? "red" : "green"}"/>`


 //   mainScene.innerHTML += `<span id="${this.guid}" class=${isPlayer ? "scene__object" : "scene__player"}></span>`;
}

GameObject.prototype.render = function() {
    const object = document.getElementById(this.guid);
    object.setAttribute('cy' ,this.y);
    object.setAttribute('cx', this.x);
    object.setAttribute('r', this.h);
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
