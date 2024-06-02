function computerChoice() {
    const choices = ["Carta", "Forbici", "Sasso"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "Pareggio!";
    } else if (
        (playerChoice === "Carta" && computerChoice === "Sasso") ||
        (playerChoice === "Forbici" && computerChoice === "Carta") ||
        (playerChoice === "Sasso" && computerChoice === "Forbici")
    ) {
        return "Hai vinto!";
    } else {
        return "Hai perso!";
    }
}

function playGame(playerChoice) {
    const computer = computerChoice();
    const messageElement = document.getElementById("message");
    const result = determineWinner(playerChoice, computer);

    messageElement.classList.remove("text-success", "text-warning", "text-danger");

    if (result === "Hai vinto!") {
        messageElement.classList.add("text-success");
    } else if (result === "Pareggio!") {
        messageElement.classList.add("text-warning");
    } else {
        messageElement.classList.add("text-danger");
    }

    messageElement.textContent = `Hai scelto ${playerChoice}, il computer ha scelto ${computer}. ${result}`;
}

function selectHand() {
    const choice = this.getAttribute("data-choice");
    playGame(choice);
}

// Aggiungiamo un evento di click a ciascuna immagine
document.querySelectorAll('.choice-image').forEach(choice => {
    choice.addEventListener('click', selectHand);
});
