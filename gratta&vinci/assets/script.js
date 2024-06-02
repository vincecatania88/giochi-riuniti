document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.bg-secondary');
    const prizes = ['Hai vinto!', 'Hai perso! Ritenta!', 'Hai perso! Ritenta', 'Hai perso! Ritenta!'];
    let scratchedCount = 0;
    const maxScratches = 3;
    let gameWon = false;
    const winMessage = document.getElementById('win-message');
    const resetButton = document.getElementById('reset-button');

    resetButton.classList.add('invisible');

    shuffle(prizes);

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (!box.classList.contains('scratched') && scratchedCount < maxScratches && !gameWon) {
                box.textContent = prizes[index];
                box.classList.remove('bg-secondary');
                box.classList.add('scratched', prizes[index] === 'Hai vinto!' ? 'bg-success' : 'bg-danger');
                box.classList.remove('box');
                scratchedCount++;

                if (prizes[index] === 'Hai vinto!') {
                    gameWon = true;
                    /* winMessage.textContent = 'Congratulazioni hai vinto!'; */
                    winMessage.classList.add('text-success');
                    resetButton.textContent = 'Congratulazioni! Hai Vinto! Gioca ancora!';
                    resetButton.classList.remove('invisible');
                    resetButton.classList.remove('btn-danger');
                    resetButton.classList.add('btn-success');
                }

                if (scratchedCount >= maxScratches && !gameWon) {
                    /* winMessage.textContent = 'Mi dispiace, hai perso! "Ritenta! Sarai più fortunato!".'; */
                    winMessage.classList.add('text-danger');
                    resetButton.textContent = 'Ritenta sarai più fortunato!';
                    resetButton.classList.remove('invisible');
                    resetButton.classList.remove('btn-success');
                    resetButton.classList.add('btn-danger');
                }
            }
        });
    });
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    window.resetGame = function() {
        scratchedCount = 0;
        gameWon = false;
        winMessage.textContent = '';
        winMessage.className = 'text-center mt-3';
        resetButton.classList.add('invisible');
        shuffle(prizes);
    
        boxes.forEach((box) => {
            box.textContent = '';
            box.classList.remove('scratched', 'bg-success', 'bg-danger');
            box.classList.add('bg-secondary', 'box');
        });
    };
});

