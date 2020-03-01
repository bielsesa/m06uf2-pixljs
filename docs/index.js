window.onload = () => {
    const tipusPreguntesFix = document.getElementById('preguntes-fixed');
    const tipusPreguntesInfinite = document.getElementById('preguntes-infinite');
    const startButton = document.getElementById('bt-start');
    let connection;
    let codi;
    let tipusPreguntes;

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
            connection.write(`const tipusPreguntes = '${tipusPreguntes}';`)
            connection.write(codi, () => { console.log('Codi enviat a Pixljs...'); }
            );
        });
    }

    startButton.onclick = () => {
        if ($('#preguntes-fixed').is(':checked')) { tipusPreguntes = "fix"; }
        else { tipusPreguntes = "infinite"; }

        $.ajax({
            url: '/pixljs/main',
            type: 'GET',
            complete: (result, status, xhr) => {
                codi = this.response;
                console.log('Rebut codi del servidor:\n%o', codi);
                connect();
            },
            error: (xhr, msg, err) => {
                console.log(`Hi ha hagut un error: ${err}`);
            }
        });
    };
};
