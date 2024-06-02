document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const resetButton = document.getElementById('reset-button');
    const playerForm = document.getElementById('player-form');
    const trisTable = document.getElementById('tris-table');
    let isCircleTurn = false;
    let playerX = '';
    let playerO = '';

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkForWin = (currentPlayer) => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentPlayer);
            });
        });
    };

    const placeMark = (cell, classToAdd) => {
        cell.classList.add(classToAdd);
    };

    const swapTurns = () => {
        isCircleTurn = !isCircleTurn;
    };

    const handleClick = (e) => {
        const cell = e.target;
        const currentClass = isCircleTurn ? 'circle' : 'x';
    
        placeMark(cell, currentClass);
    
        if (checkForWin(currentClass)) {
            setTimeout(() => {
                alert(`${currentClass === 'x' ? playerX : playerO} vince!`);
                updateScore(currentClass);
            }, 10);
            return;
        }
    
        swapTurns();
        updateTurnIndicator();
    };
    
    const updateScore = (winner) => {
        const scoreDisplay = document.getElementById('score');
        const scores = scoreDisplay.innerText.match(/\d+/g); 
        const xScore = parseInt(scores[0]);
        const oScore = parseInt(scores[1]);
    
        if (winner === 'x') {
            scoreDisplay.innerHTML = `<span class="fs-4">Punteggio:</span> 
            <span class="fs-5 text-danger fw-bold">X - ${xScore + 1}</span>, 
            <span class="fs-5 text-primary fw-bold">O - ${oScore}</span>`;
        } else {
            scoreDisplay.innerHTML = `<span class="fs-4">Punteggio:</span> 
            <span class="fs-5 text-danger fw-bold">X - ${xScore}</span>, 
            <span class="fs-5 text-primary fw-bold">O - ${oScore + 1}</span>`;
        }
    };
    
    const startGame = () => {
        cells.forEach(cell => {
            cell.classList.remove('x');
            cell.classList.remove('circle');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });

        updateTurnIndicator();
        trisTable.style.display = 'table';
        resetButton.style.display = 'block';
    };
    
    const updateTurnIndicator = () => {
        const turnIndicator = document.getElementById('turn-indicator');
        turnIndicator.innerText = isCircleTurn ? `Turno di ${playerO} (O)` : `Turno di ${playerX} (X)`;
    };
    
    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        playerX = document.getElementById('playerX').value;
        playerO = document.getElementById('playerO').value;
        playerForm.style.display = 'none';
        startGame();
    });

    resetButton.addEventListener('click', startGame);
});