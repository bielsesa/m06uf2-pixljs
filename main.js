const joc = {
	getMenuItem = item => {
		if (typeof item === 'string' && item == 'gameover')
			return function () {
				Pixl.menu(); // disable menu
				g.clear();
				g.setFontVector(20);
				g.drawString(item, (g.getWidth() - g.stringWidth(item)) / 2, 10);
				g.setFontBitmap();
				g.drawString('Prem BTN3 per reiniciar', 15, 40);
				g.flip();
				setWatch(startGame, BTN3);
			};
		return function () {
			showMenu(item);
		};
	},
	showMenu = items => {
		const menu = {
			'': { title: '-= TRIVIADOS =-' },
		};
		for (const i in items) menu[i] = getMenuItem(items[i]);
		Pixl.menu(menu);
	},
	startGame = () => {
		showMenu(tree);
	}
};
