/** Representa una pregunta del joc. */
class Pregunta {
    puntuacion;
    pregunta;
    correcta;
	incorrectas;
	tiempo;
	titulo;
	arrayIncorrectas;
	menuPregunta;

	/**
	 * Crea una pregunta amb un titol i les respostes.
	 * @param {string} pregunta 
	 * @param {string} correcta 
	 * @param {string} incorrectas 
	 */
    constructor(pregunta, correcta, incorrectas) {
		this.puntuacion = 5;
		this.tiempo = 10;
        this.pregunta = pregunta;
        this.correcta = correcta;
		this.incorrectas = incorrectas;
		this.arrayIncorrectas = incorrectas.split(',');
    }

	/** 
	 * Retorna la puntuació que et dóna la pregunta.
	 * @returns {number} puntuacion
	 */
    getPuntuacion() {
        return this.puntuacion;
    }

	/**
	 * Retorna el titol de la pregunta.
	 * @returns {string} pregunta
	 */
    getPregunta() {
        return this.pregunta;
    }

	/**
	 * Retorna la resposta correcta.
	 * @returns {string} correcta
	 */
    getCorrecta() {
        return this.correcta;
    }

	/**
	 * Retorna les respostes incorrectes.
	 * @returns {Array} arrayIncorrectas
	 */
    getIncorrectas() {
        return this.arrayIncorrectas;
	}

	/**
	 * Retorna el temps que es té per respondre la pregunta.
	 * @returns {number} tiempo
	 */
    getTiempo() {
        return this.tiempo;
    }

	/**
	 * Retorna el titol del tipus de pregunta.
	 * @returns {string} titulo
	 */
    getTitulo() {
        return this.titulo;
	}

	/**
	 * Retorna el menú que representa les respostes de la pregunta, pel Pixljs.
	 * @returns {Array} menuPregunta
	 */
	getMenuPregunta() {
		return this.menuPregunta;
	}
}

/**
 * Pregunta del tipus Ciència.
 * @extends Pregunta
 */
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
	
	/**
	 * Representació en string d'una pregunta de tipus ciència.
	 */
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

/**
 * Pregunta del tipus Geografia.
 * @extends Pregunta
 */
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
	
	/**
	 * Representació en string d'una pregunta de tipus geografia.
	 */
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

/**
 * Pregunta del tipus Història.
 * @extends Pregunta
 */
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
	
	/**
	 * Representació en string d'una pregunta de tipus historia.
	 */
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

/**
 * Pregunta del tipus Entreteniment.
 * @extends Pregunta
 */
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
	
	/**
	 * Representació en string d'una pregunta de tipus entreteniment.
	 */
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

/**
 * Pregunta del tipus Esports.
 * @extends Pregunta
 */
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
	
	/**
	 * Representació en string d'una pregunta de tipus esports.
	 */
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

/**
 * Prototype del joc. 
 * @param {string} tipusP 
 * @param {number} numP 
 */
const Joc = (tipusP, numP) => {	
	this.tipusPreguntes = tipusP;
	this.numPreguntes = numP != undefined ? numP : -1;
	this.puntuacio = 0;

	this.comprovaResposta = (item) => {
		
	};

	/**
	 * Mostra la pregunta amb les respostes durant 5 segons.
	 * @param {Pregunta} pregunta
	 */
	this.mostraPregunta = (pregunta) => {
		g.clear();
		g.setFont8x12();
		g.drawString(pregunta.toString());	
		g.flip();
		setTimeout(() => {
			this.mostraMenuPregunta(pregunta)	
		}, 5000);		
	};

	/**
	 * Mostra el menu de respostes de la pregunta.
	 * @param {Pregunta} pregunta
	 */
	this.mostraMenuPregunta = (pregunta) => {
		const menu = {
			'': { title: `-= ${pregunta.getTitulo} =-` }
		};

		let respostes = pregunta.getMenuPregunta();
		for (let i in respostes) {
			switch(respostes[i][1]) {
				case 0: 
				// menu[i] = respostes[i][0] : () => {this.puntuacio += pregunta.getPuntuacion(); this.mostraPregunta()}
				break;
			}
		}

		Pixl.menu(menu);
	};

	/** Inicia el joc mostrant la primera pregunta. */
	this.comencaJoc = () => {
		this.mostraPregunta();
	};

	/** Mostra una pantalla d'inici amb el titol del joc. */
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
const joc = new Joc(tipusPreguntes, numPreguntes);
joc.mostraTitol();
