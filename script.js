const cartas = document.querySelectorAll('.carta');
let cartaVirada = false;
let travarTabuleiro = false;
let primeiraCarta, segundaCarta;
let cont = 0;
let localBestTime;


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
            if (window.localStorage.getItem("seconds") == null) {
                window.localStorage.setItem("minutes", minutes);
                window.localStorage.setItem("seconds", seconds);
                timerDisplay.innerHTML += " &#x1f3c6";
                $("#timer").css("color", "yellow");
                showBestTime();
            } else if (minutes <= bestMinutes) {
                if (seconds <= bestSeconds) {
                    window.localStorage.setItem("minutes", minutes);
                    window.localStorage.setItem("seconds", seconds);
                    timerDisplay.innerHTML += " &#x1f3c6";
                    $("#timer").css("color", "yellow");
                    showBestTime();
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

let bestMinutes = JSON.parse(window.localStorage.getItem("minutes"));
let bestSeconds = JSON.parse(window.localStorage.getItem("seconds"));

function showBestTime() {
    bestMinutes = JSON.parse(window.localStorage.getItem("minutes"));
    bestSeconds = JSON.parse(window.localStorage.getItem("seconds"));
    bestTime.innerHTML =
        (bestMinutes ? (bestMinutes > 9 ? bestMinutes : "0" + bestMinutes) : "00") +
        ":" +
        (bestSeconds > 9 ? bestSeconds : "0" + bestSeconds);
}

let bestTime = document.getElementById("bestTime");
bestTime.innerHTML =
    (bestMinutes ? (bestMinutes > 9 ? bestMinutes : "0" + bestMinutes) : "00") +
    ":" +
    (bestSeconds > 9 ? bestSeconds : "0" + bestSeconds);



let timerDisplay = document.getElementById("timer");

let seconds = 0;

let minutes = 0;

let t;

let running = false;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    timerDisplay.innerHTML =
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
    running = true;
}

function timerStart() {
    if (!running) {
        timer();
    }
}

function timerStop() {
    clearTimeout(t);
    running = false;
}

function saveLocalStoreNew() {
    localStorage.bestTime = $('#timer').text()
}

function getLocalTime() {
    localBestTime = localStorage.getItem('bestTime')
    return localBestTime
}

function showLocalBestTime() {
    let localTime = getLocalTime()
    if (localTime != null) {
        alert("The Best Time is: " + localTime)
    } else {
        alert("No Best Time Store")
    }
}

function convertTime(ms) {
    var a = ms.split(':')
    var seconds = (+a[0]) * 60 + (+a[1])
    return seconds
}

function checkNewTime(newTime) {
    if (convertTime(localBestTime) == null) {
        saveLocalStoreNew()
    } else if (convertTime(newTime) <= convertTime(localBestTime)) {
        saveLocalStoreNew()
    }
}
