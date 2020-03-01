const Joc = (tipusP, numP) => {	
	this.tipusPreguntes = tipusP;
	this.numPreguntes = numP != undefined ? numP : -1;

	this.mostraMenu = () => {
		const menu = {
			'': { title: '-= TRIVIADOS =-' },
		};
		// for (const i in items) menu[i] = getMenuItem(items[i]);
		Pixl.menu(menu);
	};

	this.comencaJoc = () => {
		this.mostraMenu();
	};

	this.getMenuItem = item => {
		if (typeof item === 'string' && item == 'gameover')
			return function () {
				Pixl.menu(); // disable menu
				item = 'Game Over';
				g.clear();
				g.setFontVector(20);
				g.drawString(item, (g.getWidth() - g.stringWidth(item)) / 2, 10);
				g.setFontBitmap();
				g.drawString('Prem BTN3 per reiniciar', 15, 40);
				g.flip();
				setWatch(this.comencaJoc, BTN3);
			};
		return function () {
			mostraMenu(item);
		};
	};

	this.mostraTitol = () => {
		g.clear();
		g.setFontBitmap();
		g.drawString("Prem BTN3 per jugar");
		g.setFontVector(30);
		g.drawString('TRIVIA', (g.getWidth()-g.stringWidth('TRIVIA'))/2,10);
		g.flip();
		setWatch(this.comencaJoc, BTN3);
	};
};
console.log(`Tipus preguntes: ${tipusPreguntes}`);
const joc = new Joc(tipusPreguntes, );
joc.mostraTitol();
