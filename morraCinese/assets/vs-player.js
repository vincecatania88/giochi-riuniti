function determineWinner(player1Choice, player2Choice) {
    if (player1Choice === player2Choice) {
        return "Pareggio!";
    } else if (
        (player1Choice === "Carta" && player2Choice === "Sasso") ||
        (player1Choice === "Forbici" && player2Choice === "Carta") ||
        (player1Choice === "Sasso" && player2Choice === "Forbici")
    ) {
        return "Giocatore 1 ha vinto!";
    } else {
        return "Giocatore 2 ha vinto!";
    }
}
let player1Choice = null;

function selectHandPlayer1() {
    player1Choice = this.getAttribute("data-choice");
    const messageElement = document.getElementById("message");
    document.getElementById("message").textContent = "Giocatore 1 ha fatto la sua scelta.";

    messageElement.className = "fs-1 text-center";
}

function selectHandPlayer2() {
    if (!player1Choice) {
        document.getElementById("message").textContent = "Giocatore 1 deve fare la sua scelta prima.";
        return;
    }

    const player2Choice = this.getAttribute("data-choice");
    const result = determineWinner(player1Choice, player2Choice);
    const messageElement = document.getElementById("message");

    messageElement.textContent = result;

    messageElement.classList.remove("text-primary", "text-danger", "text-warning");
    
    document.getElementById("message").textContent = result;

    if (result === "Giocatore 1 ha vinto!") {
        messageElement.classList.add("text-primary");
    } else if (result === "Giocatore 2 ha vinto!") {
        messageElement.classList.add("text-danger");
    } else {
        messageElement.classList.add("text-warning");
    }
}

document.querySelectorAll('.choice-image-player-1').forEach(choice => {
    choice.addEventListener('click', selectHandPlayer1);
});

document.querySelectorAll('.choice-image-player-2').forEach(choice => {
    choice.addEventListener('click', selectHandPlayer2);
});

