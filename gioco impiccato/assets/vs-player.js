let parolaSegreta = '';
let tentativi = 6;
let paroleIndovinate = [];

function startGame() {
    parolaSegreta = document.getElementById('parolaSegreta').value.toLowerCase();
    tentativi = 6;
    paroleIndovinate = [];
    document.getElementById('inputArea').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    updateWordDisplay();
    updateAttemptsDisplay();
    resetImpiccato();
}

function updateWordDisplay() {
    const display = parolaSegreta.split('').map(letter => paroleIndovinate.includes(letter) ? letter : '_').join(' ');
    document.getElementById('wordDisplay').textContent = display;
}

function updateAttemptsDisplay() {
    document.getElementById('attemptsDisplay').textContent = `Tentativi rimasti: ${tentativi}`;
}

function makeGuess() {
    const guess = document.getElementById('letterInput').value.toLowerCase();
    document.getElementById('letterInput').value = '';
    if (guess && !paroleIndovinate.includes(guess)) {
        paroleIndovinate.push(guess);
        if (!parolaSegreta.includes(guess)) {
            tentativi--;
            updateImpiccato();
        }
        updateWordDisplay();
        updateAttemptsDisplay();
        checkGameOver();
    }
}

function submitFullGuess() {
    const fullGuess = document.getElementById('fullGuessInput').value.toLowerCase();
    document.getElementById('fullGuessInput').value = '';
    if (fullGuess === parolaSegreta) {
        document.getElementById('message').textContent = 'Hai vinto!';
        document.getElementById('message').className = 'text-success';
        document.getElementById('gameArea').style.display = 'none';
    } else {
        tentativi--;
        updateAttemptsDisplay();
        updateImpiccato();
        checkGameOver();
    }
}

function checkGameOver() {
    const messageElement = document.getElementById('message');
    if (tentativi <= 0) {
        messageElement.textContent = `Hai perso! La parola segreta era: ${parolaSegreta}`;
        messageElement.className = 'text-danger';
        document.getElementById('gameArea').style.display = 'none';
    } else if (parolaSegreta.split('').every(letter => paroleIndovinate.includes(letter))) {
        messageElement.textContent = 'Hai vinto!';
        messageElement.className = 'text-success';
        document.getElementById('gameArea').style.display = 'none';
    }
}

function resetGame() {
    parolaSegreta = '';
    tentativi = 6;
    paroleIndovinate = [];
    document.getElementById('inputArea').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('wordDisplay').textContent = '';
    document.getElementById('attemptsDisplay').textContent = '';
    const messageElement = document.getElementById('message');
    messageElement.textContent = '';
    messageElement.className = '';
    resetImpiccato();
}

function updateImpiccato() {
    const parts = ['head', 'body', 'arm-right', 'arm-left', 'leg-right', 'leg-left'];
    const visibleParts = parts.slice(0, 6 - tentativi);
    parts.forEach(part => {
        document.getElementById(part).style.display = visibleParts.includes(part) ? 'inline' : 'none';
    });
}

function resetImpiccato() {
    const parts = ['head', 'body', 'arm-right', 'arm-left', 'leg-right', 'leg-left'];
    parts.forEach(part => {
        document.getElementById(part).style.display = 'none';
    });
}