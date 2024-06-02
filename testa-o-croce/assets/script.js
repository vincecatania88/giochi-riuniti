document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const button = document.querySelector('.btn-primary');

    button.addEventListener('click', () => {
        coin.style.animation = 'jump-rotate 1s forwards';
        setTimeout(() => {
            const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
            coin.innerHTML = `<img src="./assets/${outcome}.svg" alt="${outcome}">`;
            coin.style.animation = 'none';
            button.style.display = 'none';
        }, 1000);
    });

    coin.addEventListener('click', () => {
        coin.style.animation = 'jump-rotate 1s forwards';
        setTimeout(() => {
            const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
            coin.innerHTML = `<img src="./assets/${outcome}.svg" alt="${outcome}">`;
            coin.style.animation = 'none';
        }, 1000);
    });
});

