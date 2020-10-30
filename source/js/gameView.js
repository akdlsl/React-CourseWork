var GameView = function(model) {
    this._model = model;
    this._model.updateEvent.attach(this.render.bind(this));
};

GameView.prototype.render = function () {
    this._model.player.render();
    this._model.ObjectList.forEach(value => value.render());
    document.getElementById('scene__count').innerHTML = this._model.count;
};
