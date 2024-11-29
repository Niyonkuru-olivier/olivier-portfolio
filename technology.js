document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
        alert(`You clicked on ${card.querySelector('p').innerText}!`);
    });
});
