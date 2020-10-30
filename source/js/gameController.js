
var GameController = function () {
    var player = new GameObject(null, 10, 10 , 30, 30, 10, true);
    var scene = helper.getMainScene();
    var objects = [];

    var model = new GameModel(player, objects);
    var view = new GameView(model);

    for (let i = 0; i < 4; i++) {
        model.ObjectList.push(model.generateObject(scene, null));
    }


    function updateObjects() {
        for (const i in model.ObjectList) {
            if (model.isObjectOutOfScene(model.ObjectList[i])) {
                model.ObjectList[i] = model.generateObject(scene, model.ObjectList[i].guid);
            }
            model.ObjectList[i].moveLeft();
        }

        if (!model.isOver()) {
            setTimeout(updateObjects, 1);
        } else {
            alert('Ты проиграл!');
        }

        model.update();
        model.ObjectList.forEach(object => model.intersect(model.player, object) ? model.loseCount() : null);
    }

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'a': model.playerMove(Direction.Left); break;
            case 'd': model.playerMove(Direction.Right); break;
            case 'w': model.playerMove(Direction.Up); break;
            case 's': model.playerMove(Direction.Down); break;
        }
    });

    updateObjects();
}
