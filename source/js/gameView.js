var GameView = function(model) {
    this._model = model;
    this._model.updateEvent.attach(this.render.bind(this));

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'a': model.playerMove(Direction.Left); break;
            case 'd': model.playerMove(Direction.Right); break;
            case 'w': model.playerMove(Direction.Up); break;
            case 's': model.playerMove(Direction.Down); break;
        }
    });
};

GameView.prototype.render = function () {
    this._model.player.render();
    this._model.ObjectList.forEach(value => value.render());
    document.getElementById('scene__count').innerHTML = this._model.count;
};
