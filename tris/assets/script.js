document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const resetButton = document.getElementById('reset-button');
    const singlePlayerButton = document.getElementById('single-player-button');
    const turnIndicator = document.getElementById('turn-indicator');
    const scoreDisplay = document.getElementById('score');
    let isCircleTurn = false;
    let isSinglePlayerMode = true;
    let xScore = 0;
    let oScore = 0;

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
        cell.classList.add('placed');
    };

    const swapTurns = () => {
        isCircleTurn = !isCircleTurn;
        updateTurnIndicator();
    };

    const updateTurnIndicator = () => {
        turnIndicator.innerText = isCircleTurn ? "Turno del computer" : "Il tuo turno";
    };

    const updateScore = (winner) => {
        if (winner === 'x') {
            xScore++;
        } else {
            oScore++;
        }
        scoreDisplay.innerText = `Punteggio: Computer - ${oScore}, Tu - ${xScore}`;
        scoreDisplay.innerHTML = `<span class="fs-4">Punteggio:</span> 
        <span class="fs-5 text-primary fw-bold">Computer - ${oScore}</span>, 
        <span class="fs-5 text-danger fw-bold">Tu - ${xScore}</span>`;
    };

    const computerMove = () => {
        const availableCells = [...cells].filter(cell => !cell.classList.contains('x') && !cell.classList.contains('circle'));
    
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            const combination = [cells[a], cells[b], cells[c]];
    
            if (combination.filter(cell => cell.classList.contains('circle')).length === 2 &&
                combination.filter(cell => !cell.classList.contains('x') && !cell.classList.contains('circle')).length === 1) {
                const emptyCell = combination.find(cell => !cell.classList.contains('x') && !cell.classList.contains('circle'));
                placeMark(emptyCell, 'circle');
                if (checkForWin('circle')) {
                    setTimeout(() => alert(`Il computer vince!`), 10);
                    updateScore('circle');
                    return;
                }
                swapTurns();
                return;
            }
        }
    
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            const combination = [cells[a], cells[b], cells[c]];
    
            if (combination.filter(cell => cell.classList.contains('x')).length === 2 &&
                combination.filter(cell => !cell.classList.contains('x') && !cell.classList.contains('circle')).length === 1) {
                const emptyCell = combination.find(cell => !cell.classList.contains('x') && !cell.classList.contains('circle'));
                placeMark(emptyCell, 'circle');
                swapTurns();
                return;
            }
        }
    
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        placeMark(randomCell, 'circle');
        if (checkForWin('circle')) {
            setTimeout(() => alert(`Il computer vince!`), 10);
            updateScore('circle');
            return;
        }
        swapTurns();
    };
    

    const handleClick = (e) => {
        const cell = e.target;
        const currentClass = isCircleTurn ? 'circle' : 'x';

        placeMark(cell, 'x');

        if (checkForWin('x')) {
            setTimeout(() => {
                alert(`Hai vinto!`);
                updateScore('x');
            }, 10);
            return;
        }

        setTimeout(computerMove, 500);
    };

    const startGame = () => {
        cells.forEach(cell => {
            cell.classList.remove('x');
            cell.classList.remove('circle');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });

        updateTurnIndicator();
    };

    resetButton.addEventListener('click', () => {
        xScore = 0;
        oScore = 0;
        scoreDisplay.innerText = `Punteggio: Computer - ${oScore}, Tu - ${xScore}`;
        startGame();
    });

    singlePlayerButton.addEventListener('click', () => {
        isSinglePlayerMode = true;
        startGame();
    });

    startGame();
});
