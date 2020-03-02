window.onload = () => {
    const tipusPreguntesFix = document.getElementById('preguntes-fixed');
    const tipusPreguntesInfinite = document.getElementById('preguntes-infinite');

    // variables IndexedDB
    const DB_VERSION = 20;
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
        READ_WRITE: "readwrite"
    };
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    const peticioObertura = window.indexedDB.open('DAW2', DB_VERSION);
    let db;
    const emmagatzematge = {
        desar(punts) {
            const magatzemScores = db.transaction('puntuacions', 'readwrite').objectStore('puntuacions');
            const puntuacio = {
                timestamp: new Date(),
                punts: punts,
            };

            magatzemScores.add(puntuacio);
            emmagatzematge.esborrarTaula();
            emmagatzematge.mostrar(magatzemScores);
        },
        mostrar(magatzemScores) {
            magatzemScores.openCursor().onsuccess = function (event) {
                const taula = document.getElementById('tb-scores');
                const cursor = event.target.result;
                if (cursor) {
                    const fila = taula.insertRow(1);
                    const date = cursor.key;
                    fila.insertCell(0).innerHTML = `${date.toISOString()}`;
                    fila.insertCell(1).innerHTML = cursor.value.punts;
                    cursor.continue();
                }
            };
        },
        iniciaTaula() {
            const magatzemScores = db.transaction('puntuacions', 'readwrite').objectStore('puntuacions');
            if (magatzemScores != undefined) emmagatzematge.mostrar(magatzemScores);
        },
        esborrarTaula() {
            const taula = document.getElementById('tb-scores');
            console.log('Taula rows: %o', taula.rows);
            while (taula.rows.length > 1) {
                taula.deleteRow(1);
            }
        },
        esborrarItem(timestamp) {
            magatzemScores = db.transaction('puntuacions', 'readwrite').objectStore('puntuacions');
            magatzemScores.delete(timestamp);
            emmagatzematge.esborrarTaula();
            emmagatzematge.mostrar(magatzemScores);
        },
        netejar() {
            emmagatzematge.esborrarTaula();
        },
    };

    peticioObertura.onerror = function (event) {
        console.log('Error amb IndexedDB!');
        console.log('Error: %o', event);
    };
    peticioObertura.onsuccess = function (event) {
        db = event.target.result;
        emmagatzematge.iniciaTaula();
        console.log('Connexió.\nBD: %o', db);
    };
    peticioObertura.onupgradeneeded = function (event) {
        const db = event.target.result;
        try {
            db.deleteObjectStore('puntuacions');
        } catch (e) { }
        // ObjectStore conté la informació sobre les puntuacions
        // la key unica es el timestamp
        const magatzemObjsPuntuacions = db.createObjectStore('puntuacions', {
            keyPath: 'timestamp',
        });
    };

    // variables per pasar info a Pixl.js
    let connection;
    let codi;
    let tipusPreguntes, numPreguntes;
    let puntuacio = 0;

    tipusPreguntesFix.addEventListener('click', () => {
        document.getElementById('num-preguntes').removeAttribute('disabled');
    });

    tipusPreguntesInfinite.addEventListener('click', () => {
        document.getElementById('num-preguntes').setAttribute('disabled', true);
    });

    const onLine = buf => {
        console.log(`onLine: ${buf}`);
    }

    const connect = () => {
        if (connection) {
            connection.close();
            connection = undefined;
        }

        $('#start').hide();
        $('#game').fadeIn();

        Puck.connect(c => {
            if (!c) {
                alert(`No s'ha pogut establir la connexió!`);
                return;
            }

            connection = c;
            let buf = '';
            connection.on('data', d => {
                buf += d;
                let i = buf.indexOf('\n');
                while (i >= 0) {
                    onLine(buf.substr(0, i));
                    buf = buf.substr(i + 1);
                    i = buf.indexOf('\n');
                }
            });

            console.log(`tipusPreguntes = ${tipusPreguntes}`);
            connection.write(`
                reset(); 
                g.clear();
                const tipusPreguntes = '${tipusPreguntes}';
                const numPreguntes = ${numPreguntes};`)
            connection.write(codi, () => { console.log('Codi enviat a Pixljs...'); }
            );
        });
    }

    $('#bt-start').click(() => {
        if ($('#preguntes-fixed').is(':checked')) {
            tipusPreguntes = "fix";
            numPreguntes = $('#num-preguntes').val();
        } else {
            tipusPreguntes = "infinite";
            numPreguntes = undefined;
        }

        $.ajax({
            url: '/pixljs/main',
            type: 'GET',
            complete: (result, status, xhr) => {
                codi = result.responseText;
                console.log('Rebut codi del servidor per Pixl.js');
                connect();
            },
            error: (xhr, msg, err) => {
                console.log(`Hi ha hagut un error: ${err}`);
            }
        });
    });

    $('#bt-stop').click(() => {
        // comprova si la connexió encara existeix
        // la tanca si està oberta
        if (connection) {
            connection.close();
            connection = undefined;
        }

        window.alert(`S'ha parat el joc i desconnectat del dispositiu!`);
        $('#game').hide();
        $('#start').fadeIn();
    });

    $('#bt-end').click(() => {
        // només per debugging (provar la inserció de dades a la BD)

        // comprova si la connexió encara existeix
        // la tanca si està oberta
        if (connection) {
            connection.close();
            connection = undefined;
        }

        $('#game').hide();
        $('#end').fadeIn();

        puntuacio = 50;
        emmagatzematge.desar(50);
        $('#result').text(puntuacio);
    });

    // Funció dinàmica
    $('#bt-restart').click(new Function(`$('#end').hide();$('#start').fadeIn();`));

    $('#game').hide();
    $('#end').hide();
};
