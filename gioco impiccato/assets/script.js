const words = ["cane", "gatto", "elefante", "tigre", "leone", "scimmia", "zebra", "orso", "coccodrillo", "rinoceronte"];
let secretWord;
let guessedWord;
let wrongGuesses;
const maxWrongGuesses = 6;

const wordDisplay = document.getElementById("word-display");
const insertLetter = document.getElementById("insert-letter");
const checkLetterButton = document.getElementById("check-letter");
const insertAnswer = document.getElementById("insert-answer");
const checkAnswerButton = document.getElementById("check-answer");
const messageDiv = document.getElementById("message");
const restartButton = document.getElementById("restart");

function initializeGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(secretWord.length).fill("_");
    wrongGuesses = 0;
    updateWordDisplay();
    messageDiv.textContent = "";

    document.getElementById("head").style.display = "none";
    document.getElementById("body").style.display = "none";
    document.getElementById("arm-right").style.display = "none";
    document.getElementById("arm-left").style.display = "none";
    document.getElementById("leg-right").style.display = "none";
    document.getElementById("leg-left").style.display = "none";

    insertLetter.disabled = false;
    checkLetterButton.disabled = false;
    insertAnswer.disabled = false;
    checkAnswerButton.disabled = false;
}

function updateWordDisplay() {
    wordDisplay.textContent = guessedWord.join(" ");
}

function checkLetter() {
    const letter = insertLetter.value.toLowerCase();
    insertLetter.value = "";
    if (letter.length !== 1) {
        messageDiv.textContent = "Inserisci una sola lettera.";
        return;
    }

    let correctGuess = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
            guessedWord[i] = letter;
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        wrongGuesses++;
        updateHangman();
    }

    updateWordDisplay();
    checkGameOver();
}

function updateHangman() {
    const parts = ["head", "body", "arm-right", "arm-left", "leg-right", "leg-left"];
    if (wrongGuesses <= maxWrongGuesses) {
        document.getElementById(parts[wrongGuesses - 1]).style.display = "block";
    }
}

function checkGameOver() {
    if (guessedWord.join("") === secretWord) {
        messageDiv.textContent = "Hai vinto!";
        messageDiv.classList.remove("text-danger");
        messageDiv.classList.add("text-success");
        disableGame();
    } else if (wrongGuesses >= maxWrongGuesses) {
        messageDiv.textContent = `Hai perso! La parola era: ${secretWord}`;
        messageDiv.classList.remove("text-success");
        messageDiv.classList.add("text-danger");
        disableGame();
    }
}

function disableGame() {
    insertLetter.disabled = true;
    checkLetterButton.disabled = true;
    insertAnswer.disabled = true;
    checkAnswerButton.disabled = true;
}

function restartGame() {
    initializeGame();
}

checkLetterButton.addEventListener("click", checkLetter);

checkAnswerButton.addEventListener("click", () => {
    const answer = insertAnswer.value.toLowerCase();
    if (answer === secretWord) {
        messageDiv.textContent = "Hai vinto!";
        messageDiv.classList.remove("text-danger");
        messageDiv.classList.add("text-success");
    } else {
        messageDiv.textContent = `Hai perso! La parola era: ${secretWord}`;
        messageDiv.classList.remove("text-success");
        messageDiv.classList.add("text-danger");
    }
    disableGame();
});

restartButton.addEventListener("click", restartGame);

initializeGame();
