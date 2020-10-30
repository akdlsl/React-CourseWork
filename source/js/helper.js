

var helper = function() {
    function randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function makeGuidFunc () {
        var guid = 0;

        function increment () {
            return ++guid;
        }

        return increment;
    }

    function getMainScene () {
        return document.getElementById('mainScene');
    }


    return {
        randomNumber: randomNumber,
        getGuid: makeGuidFunc(),
        getMainScene: getMainScene
    }
}()
