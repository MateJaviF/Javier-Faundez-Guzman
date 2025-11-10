window.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('BG');
    if (bg) {
        setTimeout(() => bg.classList.add('visible'), 100);
    }
});