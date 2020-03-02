class Historia extends Pregunta {
    constructor() {
        super();
        this.tiempo = 0;
    }

    setTiempo(tiempo) {
        this.tiempo = tiempo;
    }

    getTiempo() {
        return this.tiempo;
    }
    //cambiar init para polimorfismo!!
    init() {
        var tree = {
            'No Legs': 'worm',
            '2 Legs': {
                'No Feathers': 'frog',
                Feathers: 'bird',
            },
            '4 Legs': {
                Meow: 'cat',
                Woof: 'dog',
                Moo: 'cow',
            },
            '6 Legs': 'ant',
            '8 Legs': 'spider',
        };

        /* Given a menu item, return a function that
          either displays the animal name, or calls 'showMenu'
          to display another menu */
        function getMenuItem(item) {
            if (typeof item == 'string')
                return function () {
                    Pixl.menu(); // disable menu
                    g.clear();
                    g.setFontVector(20);
                    g.drawString(item, (g.getWidth() - g.stringWidth(item)) / 2, 10);
                    g.setFontBitmap();
                    g.drawString('Press BTN3 to start again', 15, 40);
                    g.flip();
                    setWatch(startGame, BTN3);
                };
            else
                return function () {
                    showMenu(item);
                };
        }

        /* Work through a set of guesses, building
          and displaying a menu */
        function showMenu(items) {
            var menu = {
                '': { title: '-= Animal Guesser =-' },
            };
            for (var i in items) menu[i] = getMenuItem(items[i]);
            Pixl.menu(menu);
        }

        /* At the start of the game start off with
          the most basic set of questions */
        function startGame() {
            showMenu(tree);
        }
    }
}