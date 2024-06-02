document.addEventListener("DOMContentLoaded", function(){
    const dice = document.getElementById('dice');
    const rollButton = document.getElementById('roll-button');

    const diceIcons = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-dice-1" viewBox="0 0 16 16">
            <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/>
            <path d="M8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
        </svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-dice-2" viewBox="0 0 16 16">
            <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/>
            <path d="M4 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-dice-3" viewBox="0 0 16 16">
            <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/>
            <path d="M4 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-dice-4" viewBox="0 0 16 16">
            <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/>
            <path d="M4 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-dice-5" viewBox="0 0 16 16">
            <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/>
            <path d="M4 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-dice-6" viewBox="0 0 16 16">
            <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/>
            <path d="M4 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM4 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>`
    ];

    rollButton.addEventListener('click', function(){
        dice.classList.add('roll');

        setTimeout(() => {
            const rollResult = Math.floor(Math.random() * 6);
            dice.innerHTML = diceIcons[rollResult];
            dice.classList.remove('roll');
        }, 500);
    });
});



    /* rollButton.addEventListener('click', function(){
        const rollResult = Math.floor(Math.random() * 6) + 1;
        dice.textContent = rollResult;
    }); */