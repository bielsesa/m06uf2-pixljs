// Classes
class Pregunta {
    puntuacion;
    pregunta;
    correcta;
	incorrectas;
	tiempo;
	titulo;
	arrayIncorrectas;
	menuPregunta;

    constructor(pregunta, correcta, incorrectas) {
		this.puntuacion = 5;
		this.tiempo = 10;
        this.pregunta = pregunta;
        this.correcta = correcta;
		this.incorrectas = incorrectas;
		this.arrayIncorrectas = incorrectas.split(',');
    }

    getPuntuacion() {
        return this.puntuacion;
    }

    getPregunta() {
        return this.pregunta;
    }

    getCorrecta() {
        return this.correcta;
    }

    getIncorrectas() {
        return this.incorrectas;
	}

    getTiempo() {
        return this.tiempo;
    }

    getTitulo() {
        return this.titulo;
	}

	getMenuPregunta() {
		return this.menuPregunta;
	}
}

class Ciencia extends Pregunta {

    constructor() {
        super();
		titulo = 'Ciencia';
		menuPregunta = [
			this.arrayIncorrectas[0],
			this.correcta,
			this.arrayIncorrectas[2],
			this.arrayIncorrectas[1],
		]
	}
	
	toString() {
		return 
		`
			${this.pregunta}\n
			1.-${this.arrayIncorrectas[0]}\n
			2.-${this.correcta}\n
			3.-${this.arrayIncorrectas[2]}\n
			4.-${this.arrayIncorrectas[1]}\n
		`
	}
}

class Geografia extends Pregunta {
    constructor() {
        super();
		titulo = 'Geografia';
		menuPregunta = [
			this.arrayIncorrectas[0],
			this.arrayIncorrectas[2],
			this.arrayIncorrectas[1],
			this.correcta,
		]
    }    
	
	toString() {
		return 
		`
			${this.pregunta}\n
			1.-${this.arrayIncorrectas[0]}\n
			2.-${this.arrayIncorrectas[2]}\n
			3.-${this.arrayIncorrectas[1]}\n
			4.-${this.correcta}\n
		`
	}
}

class Historia extends Pregunta {
    constructor() {
        super();
		titulo = 'Historia';
		menuPregunta = [
			this.arrayIncorrectas[1],
			this.arrayIncorrectas[2],
			this.correcta,
			this.arrayIncorrectas[0],
		]
    }    
	
	toString() {
		return 
		`
			${this.pregunta}\n
			1.-${this.arrayIncorrectas[1]}\n
			2.-${this.arrayIncorrectas[2]}\n
			3.-${this.correcta}\n
			4.-${this.arrayIncorrectas[0]}\n
		`
	}
}

class Entretenimiento extends Pregunta {
    constructor() {
        super();
		titulo = 'Entretenimiento';
		menuPregunta = [
			this.correcta,
			this.arrayIncorrectas[2],
			this.arrayIncorrectas[0],
			this.arrayIncorrectas[1],
		]
    }    
	
	toString() {
		return 
		`
			${this.pregunta}\n
			1.-${this.correcta}\n
			2.-${this.arrayIncorrectas[2]}\n
			3.-${this.arrayIncorrectas[0]}\n
			4.-${this.arrayIncorrectas[1]}\n
		`
	}
}

class Deporte extends Pregunta {
    constructor() {
        super();
		titulo = 'Deporte';
		menu = [
			this.arrayIncorrectas[0],
			this.arrayIncorrectas[2],
			this.correcta,
			this.arrayIncorrectas[1],
		]
    }    
	
	toString() {
		return 
		`
			${this.pregunta}\n
			1.-${this.arrayIncorrectas[0]}\n
			2.-${this.arrayIncorrectas[2]}\n
			3.-${this.correcta}\n
			4.-${this.arrayIncorrectas[1]}\n
		`
	}
}

// Objecte Prototype
const Joc = (tipusP, numP) => {	
	this.tipusPreguntes = tipusP;
	this.numPreguntes = numP != undefined ? numP : -1;
	this.puntuacio = 0;

	this.mostraPregunta = (pregunta) => {
		g.clear();
		g.setFont8x12();
		g.drawString(pregunta.toString());	
		g.flip();
		setTimeout(() => {
			this.mostraMenuPregunta(pregunta)	
		}, 5000);		
	};

	this.mostraMenuPregunta = (pregunta) => {
		const menu = {
			'': { title: `-= ${pregunta.getTitulo} =-` }
		};

		let respostes = pregunta.getMenuPregunta();
		for (let i in respostes) {
			switch(respostes[i][1]) {
				case 0: 
				// menu[i] = {`${respostes[i][0]}`: () => {this.puntuacio += pregunta.getPuntuacion(); this.mostraPregunta()}};
				break;


			}
		}

		Pixl.menu(menu);
	};

	this.comencaJoc = () => {
		this.mostraPregunta();
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
