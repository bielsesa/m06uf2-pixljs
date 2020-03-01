class Juego {

    constructor() {
        this.puntuaciones = new Array();
        this.numPreguntas = 0;
        this.inGame = false;
    }

    setPuntuaciones(puntuacion) {
        this.puntuaciones.push(puntuacion);
    }

    setNumPreguntas(nPreguntas) {
        this.numPreguntas = nPreguntas;
    }

    setInGame(inGame) {
        this.inGame = inGame;
    }

    getPuntuaciones() {
        return this.puntuaciones;
    }

    getNumPreguntas() {
        return this.numPreguntas;
    }

    getInGame() {
        return this.inGame;
    }

    iniciar() {

    }

    terminar() {

    }


}