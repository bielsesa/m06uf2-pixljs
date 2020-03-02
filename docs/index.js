window.onload = () => {
    const tipusPreguntesFix = document.getElementById('preguntes-fixed');
    const tipusPreguntesInfinite = document.getElementById('preguntes-infinite');

    // variables IndexedDB
    const DB_VERSION = 19;
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
        READ_WRITE: "readwrite"
    };
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    // variables per pasar info a Pixl.js
    let connection;
    let codi;
    let tipusPreguntes, numPreguntes;

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

        $('#start').addClass('invisible');
        $('#game').removeClass('invisible');

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
                console.log('Rebut codi del servidor:\n%o', codi);
                connect();
            },
            error: (xhr, msg, err) => {
                console.log(`Hi ha hagut un error: ${err}`);
            }
        });
    });

    $('#bt-stop').click(() => {
        if (connection) {
            connection.close();
            connection = undefined;
        }

        window.alert(`S'ha parat el joc i desconnectat del dispositiu!`);
        $('#game').addClass('invisible');
        $('#start').removeClass('invisible');
    });
};
