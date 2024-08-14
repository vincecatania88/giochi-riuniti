document.addEventListener('DOMContentLoaded', () => {
    const gameSection = document.getElementById('game-section');
    const shipForm = document.getElementById('ship-form');
    const gameGrid = document.getElementById('game-grid');
    const resetPlacementButton = document.getElementById('reset-placement');
    const startGameButton = document.getElementById('start-game');
    const restartGameButton = document.getElementById('restart-game');

    const gridSize = 10; // Dimensione della griglia
    let selectedShip = null;
    let direction = 'h'; // Direzione predefinita
    let isPlaying = false; // Modalità gioco attivata

    // Limiti per le navi
    const maxShips = {
        5: 2,
        4: 1,
        3: 2,
        2: 1
    };

    // Contatore per le navi posizionate
    const shipCount = {
        5: 0,
        4: 0,
        3: 0,
        2: 0
    };

    // Navi posizionate nella griglia
    const placedShips = [];

    // Mappa dei colori per le navi
    const shipColors = {
        5: ['#7d7d7d', '#4a4a4a'],
        4: ['#737703'],
        3: ['#037743', '#005e24'],
        2: ['#430090']
    };

    function createGrid() {
        gameGrid.innerHTML = ''; // Pulisce la griglia esistente

        // Intestazione delle colonne
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th')); // angolo in alto a sinistra
        for (let j = 1; j <= gridSize; j++) {
            const th = document.createElement('th');
            th.textContent = j;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);

        // Corpo della tabella con intestazioni delle righe e celle
        const tbody = document.createElement('tbody');
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement('tr');
            const rowHeader = document.createElement('th');
            rowHeader.textContent = String.fromCharCode(65 + i); // Converti numero in lettera
            row.appendChild(rowHeader);

            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('td');
                cell.className = 'table-cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }

        gameGrid.appendChild(thead);
        gameGrid.appendChild(tbody);
    }

    function handleCellClick(event) {
        if (selectedShip === null) return;

        if (!isPlaying) {
            // Posizionamento delle navi
            const cell = event.target;
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            if (canPlaceShip(row, col)) {
                placeShip(row, col);
            }
        } else {
            // Gioco in corso
            const cell = event.target;
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            // Segna colpo a segno
            if (isShipAt(row, col)) {
                cell.classList.add('hit');
            }
        }
    }

    function canPlaceShip(row, col) {
        const shipLength = parseInt(selectedShip);
        if (direction === 'h') {
            if (col + shipLength > gridSize) return false;
            for (let i = 0; i < shipLength; i++) {
                if (document.querySelector(`[data-row="${row}"][data-col="${col + i}"]`).classList.contains('occupied')) {
                    return false;
                }
            }
        } else if (direction === 'v') {
            if (row + shipLength > gridSize) return false;
            for (let i = 0; i < shipLength; i++) {
                if (document.querySelector(`[data-row="${row + i}"][data-col="${col}"]`).classList.contains('occupied')) {
                    return false;
                }
            }
        }
        return true;
    }

    function placeShip(row, col) {
        const shipLength = parseInt(selectedShip);
        const cellsToOccupy = [];

        if (direction === 'h') {
            for (let i = 0; i < shipLength; i++) {
                cellsToOccupy.push(document.querySelector(`[data-row="${row}"][data-col="${col + i}"]`));
            }
        } else if (direction === 'v') {
            for (let i = 0; i < shipLength; i++) {
                cellsToOccupy.push(document.querySelector(`[data-row="${row + i}"][data-col="${col}"]`));
            }
        }

        // Verifica se tutte le celle possono essere occupate
        if (cellsToOccupy.every(cell => !cell.classList.contains('occupied'))) {
            cellsToOccupy.forEach((cell, index) => {
                cell.classList.add('occupied');
                cell.style.backgroundColor = shipColors[shipLength][shipCount[shipLength]]; // Assegna il colore
            });
            placedShips.push(...cellsToOccupy.map(cell => ({
                row: parseInt(cell.dataset.row),
                col: parseInt(cell.dataset.col)
            })));

            // Incrementa il contatore per la nave posizionata
            shipCount[shipLength]++;
            checkShipLimits();
            updateShipCount(); // Aggiorna il numero di navi disponibili
        } else {
            alert('Non puoi posizionare la nave qui.');
        }
    }

    function isShipAt(row, col) {
        return placedShips.some(ship => ship.row === row && ship.col === col);
    }

    function disableShipOption(shipLength) {
        document.querySelector(`#ship${shipLength}`).disabled = true;
    }

    function enableShipOptions() {
        Object.keys(maxShips).forEach(length => {
            const shipElement = document.querySelector(`#ship${length}`);
            shipElement.disabled = shipCount[length] >= maxShips[length];
        });
    }

    function checkShipLimits() {
        enableShipOptions();
    }

    function updateShipCount() {
        Object.keys(maxShips).forEach(length => {
            const countElement = document.getElementById(`ship${length}-count`);
            countElement.textContent = `(${maxShips[length] - shipCount[length]})`;
        });
    }

    function resetPlacement() {
        document.querySelectorAll('.table-cell').forEach(cell => {
            cell.classList.remove('occupied');
            cell.classList.remove('hit');
            cell.style.backgroundColor = ''; // Resetta il colore
        });
        // Resetta i contatori delle navi
        for (const length in shipCount) {
            shipCount[length] = 0;
        }
        // Riabilita tutte le opzioni di nave
        enableShipOptions();
        placedShips.length = 0; // Svuota l'array delle navi posizionate
        isPlaying = false; // Resetta la modalità di gioco
        updateShipCount(); // Aggiorna il numero di navi disponibili
    }

    function startNewGame() {
        resetPlacement();
        // Riabilita il modulo per posizionare le navi
        shipForm.classList.remove('hidden');
        // Abilita i pulsanti "Resetta posizionamento" e "Inizia la battaglia"
        resetPlacementButton.disabled = false;
        startGameButton.disabled = false;
        updateShipCount(); // Inizializza il numero di navi disponibili
    }

    // Inizializza la schermata di gioco subito
    createGrid();
    enableShipOptions();
    updateShipCount(); // Mostra il numero iniziale di navi disponibili

    shipForm.addEventListener('change', (event) => {
        if (event.target.name === 'ship') {
            selectedShip = event.target.value;
        } else if (event.target.name === 'direction') {
            direction = event.target.value;
        }
    });

    resetPlacementButton.addEventListener('click', resetPlacement);

    // Funzione per iniziare il gioco
    startGameButton.addEventListener('click', () => {
        if (placedShips.length === 0) {
            alert('Posiziona tutte le navi prima di iniziare il gioco.');
            return;
        }
        isPlaying = true;
        shipForm.classList.add('hidden'); // Nascondi il modulo delle navi
        
        // Disabilita i pulsanti "Resetta posizionamento" e "Inizia la battaglia"
        resetPlacementButton.disabled = true;
        startGameButton.disabled = true;
    });

    // Funzione per ricominciare la partita
    restartGameButton.addEventListener('click', startNewGame);
});
