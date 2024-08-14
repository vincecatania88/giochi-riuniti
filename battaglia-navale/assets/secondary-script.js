// secondary-script.js

document.addEventListener('DOMContentLoaded', () => {
    const secondaryGrid = document.getElementById('secondary-grid');
    const blueBtn = document.getElementById('blue-btn');
    const yellowBtn = document.getElementById('yellow-btn');
    const redBtn = document.getElementById('red-btn');
    let selectedColor = '';

    function createSecondaryGrid() {
        secondaryGrid.innerHTML = ''; // Pulisce la griglia esistente

        // Intestazione delle colonne
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th')); // angolo in alto a sinistra
        for (let j = 1; j <= 10; j++) {
            const th = document.createElement('th');
            th.textContent = j;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);

        // Corpo della tabella con intestazioni delle righe e celle
        const tbody = document.createElement('tbody');
        for (let i = 0; i < 10; i++) {
            const row = document.createElement('tr');
            const rowHeader = document.createElement('th');
            rowHeader.textContent = String.fromCharCode(65 + i); // Converti numero in lettera
            row.appendChild(rowHeader);

            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('td');
                cell.className = 'table-cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }

        secondaryGrid.appendChild(thead);
        secondaryGrid.appendChild(tbody);
    }

    function handleCellClick(event) {
        const cell = event.target;
        if (selectedColor) {
            // Se la cella ha già un colore, rimuovilo, altrimenti applica il colore selezionato
            if (cell.classList.contains('blue') || cell.classList.contains('yellow') || cell.classList.contains('red')) {
                cell.classList.remove('blue', 'yellow', 'red');
            } else {
                cell.classList.add(selectedColor);
            }
        }
    }

    blueBtn.addEventListener('click', () => {
        selectedColor = 'blue';
    });

    yellowBtn.addEventListener('click', () => {
        selectedColor = 'yellow';
    })

    redBtn.addEventListener('click', () => {
        selectedColor = 'red';
    });

    createSecondaryGrid();
});
