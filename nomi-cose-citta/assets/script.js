
const playerForm = document.getElementById('player-form');
const playerOneInput = document.getElementById('playerOne');
const dataTable = document.getElementById('data-table');
/* const randomLetterElement = document.getElementById('randomLetter'); */
const resetButton = document.getElementById('reset-button');
const clearButton = document.getElementById('clear-button');
const startTimerButton = document.getElementById('start-timer-button');
const randomLetterModalElement = document.getElementById('randomLetterModal');
const countdownElement = document.getElementById('countdown');
const totalScoreInput = document.querySelector('.total-score-input');
const totalCell = document.getElementById('total-cell');
const letterInput = document.getElementById('letterInput');


let playerName = '';
let selectedLetter = '';
let totalScore = 0;

function generateRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

/* function startGame(event) {
    event.preventDefault();
    playerName = playerOneInput.value.trim();

    playerForm.style.display = 'none';
    dataTable.style.display = 'table';

    selectedLetter = generateRandomLetter();
    randomLetterElement.textContent = `Lettera selezionata: ${selectedLetter}`;

    const playerNameElement = document.createElement('h3');
    playerNameElement.textContent = `Giocatore: ${playerName}`;
    document.body.insertBefore(playerNameElement, dataTable);

    clearTable(); 
} */

        function startGame(event) {
            event.preventDefault();
            playerName = playerOneInput.value.trim();
            selectedLetter = letterInput.value.trim().toUpperCase();
        
            if (!selectedLetter || selectedLetter.length !== 1) {
                alert('Inserisci una lettera valida!');
                return;
            }
        
            playerForm.style.display = 'none';
            dataTable.style.display = 'table';
        
            randomLetterElement.textContent = `Lettera selezionata: ${selectedLetter}`;
        
            const playerNameElement = document.createElement('h3');
            playerNameElement.textContent = `Giocatore: ${playerName}`;
            document.body.insertBefore(playerNameElement, dataTable);
        
            clearTable();
        }
    

function checkWordStartsWithLetter(word) {
    return word.trim().toUpperCase().startsWith(selectedLetter);
}

function checkWordLength(word) {
    return word.trim().length >= 3;
}

function checkWordsEntered() {
    const wordInputs = document.querySelectorAll('.word-input');
    let allEntered = true;

    wordInputs.forEach(input => {
        const word = input.value.trim();
        if (word === '' || !checkWordStartsWithLetter(word) || !checkWordLength(word)) {
            allEntered = false;
        }
    });

    startTimerButton.disabled = !allEntered;
}

let currentGameScore = 0; 

/* function resetGame() {
    const wordInputs = document.querySelectorAll('.word-input');
    wordInputs.forEach(input => {
        input.disabled = false;
    });

    const scoreInputs = document.querySelectorAll('.score-input');
    scoreInputs.forEach(input => {
        input.disabled = true;
    });
    totalScore += currentGameScore;

    clearTable(); 
    selectedLetter = generateRandomLetter();
    randomLetterElement.textContent = `Lettera selezionata: ${selectedLetter}`;
    totalCell.textContent = totalScore;
    totalScoreInput.value = totalScore;
    totalCell.dataset.total = totalScore;

    currentGameScore = 0;
} */

        function resetGame() {
            const wordInputs = document.querySelectorAll('.word-input');
            wordInputs.forEach(input => {
                input.disabled = false;
            });
        
            const scoreInputs = document.querySelectorAll('.score-input');
            scoreInputs.forEach(input => {
                input.disabled = true;
            });
        
            totalScore += currentGameScore;
        
            clearTable();
            playerForm.style.display = 'block'; // Mostra nuovamente il form
            dataTable.style.display = 'none';   // Nascondi la tabella
        
            totalCell.textContent = totalScore;
            totalScoreInput.value = totalScore;
            totalCell.dataset.total = totalScore;
        
            currentGameScore = 0;
        }

function clearTable() {
    const wordInputs = document.querySelectorAll('.word-input');
    wordInputs.forEach(input => {
        input.value = '';
    });

    const scoreInputs = document.querySelectorAll('.score-input');
    scoreInputs.forEach(input => {
        input.value = '';
    });

    updateTotalScore();

    startTimerButton.disabled = true;
    countdownElement.textContent = '';
}

function updateTotalScore() {
    let sum = 0;
    const scoreInputs = document.querySelectorAll('.score-input');
    scoreInputs.forEach(input => {
        if (input.value !== '') {
            sum += parseInt(input.value);
        }
    });
    currentGameScore = sum;
    totalScoreInput.value = totalScore + currentGameScore; 
}

function startTimer() {
    startTimerButton.disabled = true;
    let count = 10;
    const timerInterval = setInterval(() => {
        countdownElement.textContent = `Timer: ${count} secondi`;
        count--;

        if (count < 0) {
            clearInterval(timerInterval);
            countdownElement.textContent = 'Gioco terminato';

            const wordInputs = document.querySelectorAll('.word-input');
            wordInputs.forEach(input => {
                input.disabled = true;
            });

            const scoreInputs = document.querySelectorAll('.score-input');
            scoreInputs.forEach(input => {
                input.disabled = false;
            });
        }
    }, 1000);
}

playerForm.addEventListener('submit', startGame);

const wordInputs = document.querySelectorAll('.word-input');
wordInputs.forEach(input => {
    input.addEventListener('input', checkWordsEntered);
});

resetButton.addEventListener('click', resetGame);

clearButton.addEventListener('click', clearTable);

startTimerButton.addEventListener('click', startTimer);

const scoreInputs = document.querySelectorAll('.score-input');
scoreInputs.forEach(input => {
    input.addEventListener('input', updateTotalScore);
});