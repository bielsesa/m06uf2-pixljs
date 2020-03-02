class Pregunta {
    puntuacion;
    pregunta;
    correcta;
    incorrectas;

    constructor(pregunta, correcta, incorrectas) {
        this.puntuacion = 0;
        this.pregunta = pregunta;
        this.correcta = correcta;
        this.incorrectas = incorrectas;
    }

    setPuntuacion(puntuacion) {
        this.puntuacion = puntuacion;
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
}