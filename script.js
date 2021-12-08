const cartas = document.querySelectorAll('.carta');
let cartaVirada = false;
let travarTabuleiro = false;
let primeiraCarta, segundaCarta;
let cont = 0;
let melhorTempoLocal;


function iniciarJogo() {

    function virarCarta() {
        if (travarTabuleiro) return;
        if (this === primeiraCarta) return;

        this.classList.add('flip');

        if (!cartaVirada) {
            cartaVirada = true;
            primeiraCarta = this;
            return;
        }

        segundaCarta = this;

        verificaIgual();
    }

    function verificaIgual() {
        let combinado = primeiraCarta.dataset.carta === segundaCarta.dataset.carta

        if (combinado) {
            resetarCartas();
            cont++;
        } else {
            desvirarCartas();
        }
    }

    function resetarCartas() {
        primeiraCarta.removeEventListener('click', virarCarta);
        segundaCarta.removeEventListener('click', virarCarta);

        resetarTabuleiro();
    }

    function desvirarCartas() {
        travarTabuleiro = true;

        setTimeout(() => {
            primeiraCarta.classList.remove('flip');
            segundaCarta.classList.remove('flip');

            resetarTabuleiro();
        }, 1500);
    }

    function resetarTabuleiro() {
        [cartaVirada, travarTabuleiro] = [false, false];
        [primeiraCarta, segundaCarta] = [null, null];
    }

    function terminarJogo() {
        if (cont == 8) {
            timerStop();
            setTimeout(function () {
                window.alert("Parabéns!");
                window.location.reload();
            }, 500);
            if (window.localStorage.getItem("segundos") == null) {
                window.localStorage.setItem("minutos", minutos);
                window.localStorage.setItem("segundos", segundos);
                timerDisplay.innerHTML += " &#x1f3c6";
                $("#timer").css("color", "yellow");
                mostrarMelhorTempo();
            } else if (minutos <= melhorMinutos) {
                if (segundos <= melhorSegundos) {
                    window.localStorage.setItem("minutos", minutos);
                    window.localStorage.setItem("segundos", segundos);
                    timerDisplay.innerHTML += " &#x1f3c6";
                    $("#timer").css("color", "yellow");
                    mostrarMelhorTempo();
                }
            }
        }
    }


    (function shuffle() {
        cartas.forEach((carta) => {
            let randomPosition = Math.floor(Math.random() * 16);
            carta.style.order = randomPosition;
        })
    })();

    cartas.forEach((carta) => {
        carta.addEventListener('click', virarCarta);
        carta.addEventListener('click', timerStart);
        carta.addEventListener('click', terminarJogo);
    });
}

function reset(){
    window.location.reload();
    iniciarJogo();
}

let melhorMinutos = JSON.parse(window.localStorage.getItem("minutos"));
let melhorSegundos = JSON.parse(window.localStorage.getItem("segundos"));

function mostrarMelhorTempo() {
    melhorMinutos = JSON.parse(window.localStorage.getItem("minutos"));
    melhorSegundos = JSON.parse(window.localStorage.getItem("segundos"));
    melhorTempo.innerHTML =
        (melhorMinutos ? (melhorMinutos > 9 ? melhorMinutos : "0" + melhorMinutos) : "00") +
        ":" +
        (melhorSegundos > 9 ? melhorSegundos : "0" + melhorSegundos);
}

let melhorTempo = document.getElementById("melhorTempo");
melhorTempo.innerHTML =
    (melhorMinutos ? (melhorMinutos > 9 ? melhorMinutos : "0" + melhorMinutos) : "00") +
    ":" +
    (melhorSegundos > 9 ? melhorSegundos : "0" + melhorSegundos);



let timerDisplay = document.getElementById("timer");

let segundos = 0;

let minutos = 0;

let tempo;

let tempoCorrendo = false;

function add() {
    segundos++;
    if (segundos >= 60) {
        segundos = 0;
        minutos++;
    }

    timerDisplay.innerHTML =
        (minutos ? (minutos > 9 ? minutos : "0" + minutos) : "00") +
        ":" +
        (segundos > 9 ? segundos : "0" + segundos);

    timer();
}

function timer() {
    tempo = setTimeout(add, 1000);
    tempoCorrendo = true;
}

function timerStart() {
    if (!tempoCorrendo) {
        timer();
    }
}

function timerStop() {
    clearTimeout(tempo);
    tempoCorrendo = false;
}

function salvarNovoLocalStorage() {
    localStorage.melhorTempo = $('#timer').text()
}

function getTempoLocal() {
    melhorTempoLocal = localStorage.getItem('melhorTempo')
    return melhorTempoLocal;
}

function converterTempo(ms) {
    var a = ms.split(':')
    var segundos = (+a[0]) * 60 + (+a[1])
    return segundos
}

function checarNovoTempo(novoTempo) {
    if (converterTempo(melhorTempoLocal) == null) {
        salvarNovoLocalStorage();
    } else if (converterTempo(novoTempo) <= converterTempo(melhorTempoLocal)) {
        salvarNovoLocalStorage();
    }
}
