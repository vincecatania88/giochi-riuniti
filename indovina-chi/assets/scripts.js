document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    const gameBoard = document.getElementById('game-board');
    const questionsList = document.getElementById('questions-list');
    const questionForm = document.getElementById('question-form');
    const submitGuessButton = document.getElementById('submit-guess');

    const people = [
        { name: 'Bruno', gender: 'Maschio', eyes: 'Castani', glasses: false, hairColor: 'Bruno', facialHair: true, image: './assets/bruno.png' },
        { name: 'Mary', gender: 'Femmina', eyes: 'Verdi', glasses: true, hairColor: 'Biondo', facialHair: false, image: './assets/mary.png' },
        { name: 'Cristiano', gender: 'Maschio', eyes: 'Neri', glasses: true, hairColor: 'Nero', facialHair: true, image: './assets/cristiano.png' },
        { name: 'Anna', gender: 'Femmina', eyes: 'Verdi', glasses: false, hairColor: 'Rosso', facialHair: false, image: './assets/anna.png' },
        { name: 'Stefano', gender: 'Maschio', eyes: 'Castani', glasses: false, hairColor: 'Calvo', facialHair: true, image: './assets/stefano.png' },
        { name: 'Sofia', gender: 'Femmina', eyes: 'Neri', glasses: true, hairColor: 'Nero', facialHair: false, image: './assets/sofia.png' },
        { name: 'Giovanni', gender: 'Maschio', eyes: 'Neri', glasses: false, hairColor: 'Nero', facialHair: true, image: './assets/giovanni.png' },
        { name: 'Angela', gender: 'Femmina', eyes: 'Castani', glasses: true, hairColor: 'Grigio', facialHair: false, image: './assets/angela.png' },
        { name: 'Davide', gender: 'Maschio', eyes: 'Verdi', glasses: false, hairColor: 'Biondo', facialHair: false, image: './assets/davide.png' },
        { name: 'Giulia', gender: 'Femmina', eyes: 'Castani', glasses: false, hairColor: 'Nero', facialHair: false, image: './assets/giulia.png' },
        { name: 'Simone', gender: 'Maschio', eyes: 'Castani', glasses: true, hairColor: 'Calvo', facialHair: false, image: './assets/simone.png' },
        { name: 'Sara', gender: 'Femmina', eyes: 'Blu', glasses: false, hairColor: 'Biondo', facialHair: false, image: './assets/sara.png' }
    ];

    let personToGuess;

    function selectPersonToGuess() {
        personToGuess = people[Math.floor(Math.random() * people.length)];
        console.log('Persona da indovinare:', personToGuess);
    }

    function createGameBoard() {
        people.forEach(person => {
            const card = document.createElement('div');
            card.classList.add('col');
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${person.image}" class="card-img-top" alt="${person.name}">
                    <div class="card-body">
                        <h5 class="card-title">${person.name}</h5>
                        <button class="btn btn-danger close-button">Chiudi</button>
                    </div>
                </div>
            `;
            card.querySelector('.close-button').addEventListener('click', () => closeCard(card));
            gameBoard.appendChild(card);
        });
    }

    function askQuestion(event) {
        event.preventDefault();
    
        const selectedQuestion = questionForm.querySelector('input[name="question"]:checked');
        if (!selectedQuestion) {
            alert("Seleziona una domanda prima di inviare.");
            return;
        }
    
        const question = selectedQuestion.value;
        let answer;
    
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
    
        if (question === 'gender') {
            answer = personToGuess.gender === 'Maschio' ? 'Sì, è maschio' : 'No, è femmina';
        } else if (question === 'eyes') {
            answer = personToGuess.eyes === 'Castani' ? 'Sì, ha gli occhi castani' : 'No, non ha gli occhi castani';
        } else if (question === 'glasses') {
            answer = personToGuess.glasses ? 'Sì' : 'No';
        } else if (question === 'hairColor') {
            if ('hairColor' in personToGuess && personToGuess.hairColor) {
                const colors = { 'Bruno': 'marroni', 'Biondo': 'biondi', 'Nero': 'neri', 'Rosso': 'rossi', 'Calvo': 'calvo', 'Grigio': 'grigi' };
                if (personToGuess.hairColor === 'Biondo') {
                    answer = 'Sì, i capelli sono di colore biondi';
                } else {
                    answer = `No, i capelli sono di colore ${colors[personToGuess.hairColor]}`;
                }
            } else {
                answer = 'Non è specificato il colore dei capelli';
            }
        } else if (question === 'facialHair') {
            answer = personToGuess.facialHair ? 'Sì' : 'No';
        }
    
        listItem.textContent = `${selectedQuestion.labels[0].textContent}: ${answer}`;
        questionsList.appendChild(listItem);
    }
    
    

    function closeCard(card) {
        card.style.display = 'none';
    }

    function submitGuess() {
        const guessInput = document.getElementById('guess-person');
        const guess = guessInput.value.trim();

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        if (!guess) {
            listItem.textContent = "Inserisci il nome della persona che stai indovinando.";
        } else if (guess.toLowerCase() === personToGuess.name.toLowerCase()) {
            listItem.innerHTML = `<span class="text-success">Congratulazioni! Hai indovinato la persona correttamente.</span>`;
        } else {
            listItem.innerHTML = `<span class="text-danger">Mi dispiace, non hai indovinato il nome della persona. Riprova!</span>`;
        }

        questionsList.appendChild(listItem);
    }

    function resetGame() {
        gameBoard.innerHTML = '';
        questionsList.innerHTML = '';
        selectPersonToGuess();
        createGameBoard();
    }

    startButton.addEventListener('click', resetGame);
    questionForm.addEventListener('submit', askQuestion);
    submitGuessButton.addEventListener('click', submitGuess);
});

/*
        { name: 'Bruno', gender: 'Maschio', age: 30, glasses: false, hairColor: 'Bruno', facialHair: true, image: '/assets/Bruno.jpeg' },
        { name: 'Mary', gender: 'Femmina', age: 25, glasses: true, hairColor: 'Biondo', facialHair: false, image: '/assets/Mary.jpeg' },
        { name: 'Cristiano', gender: 'Maschio', age: 40, glasses: true, hairColor: 'Nero', facialHair: true, image: '/assets/Cristiano.jpeg' },
        { name: 'Anna', gender: 'Femmina', age: 35, glasses: false, hairColor: 'Rosso', facialHair: false, image: '/assets/Anna.jpeg' },
        { name: 'Stefano', gender: 'Maschio', age: 50, glasses: false, hairColor: 'Calvo', facialHair: true, image: '/assets/Stefano.jpeg' },
        { name: 'Sofia', gender: 'Femmina', age: 20, glasses: true, hairColor: 'Nero', facialHair: false, image: '/assets/Sofia.jpeg' },
        { name: 'Giovanni', gender: 'Maschio', age: 45, glasses: false, hairColor: 'Nero', facialHair: true, image: '/assets/Giovanni.jpeg' },
        { name: 'Angela', gender: 'Femmina', age: 60, glasses: true, hairColor: 'Grigio', facialHair: false, image: '/assets/Angela.jpeg' },
        { name: 'Davide', gender: 'Maschio', age: 22, glasses: false, hairColor: 'Biondo', facialHair: false, image: '/assets/Davide.jpeg' },
        { name: 'Giulia', gender: 'Femmina', age: 28, glasses: false, hairColor: 'Nero', facialHair: false, image: '/assets/Giulia.jpeg' }
*/