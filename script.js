document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const proposalContainer = document.getElementById('proposal-container');
    const successContainer = document.getElementById('success-container');

    // Make the NO button run away when hovered or clicked
    function moveButton() {
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Calculate safe boundaries so the button doesn't go off screen
        const maxX = window.innerWidth - btnWidth - 20;
        const maxY = window.innerHeight - btnHeight - 20;

        const randomX = Math.max(20, Math.random() * maxX);
        const randomY = Math.max(20, Math.random() * maxY);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    }

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // Handle YES button click
    yesBtn.addEventListener('click', () => {
        // Fade out proposal
        proposalContainer.classList.remove('active');
        proposalContainer.classList.add('hidden');

        // Wait a moment, then show success screen
        setTimeout(() => {
            successContainer.classList.remove('hidden');
            successContainer.classList.add('active');
            fireNeonConfetti();
        }, 500);
    });

    // Neon confetti effect 
    function fireNeonConfetti() {
        const duration = 4000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Neon colors to match the theme
            const colors = ['#ff007f', '#00f3ff', '#b500ff', '#ffffff'];

            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: colors
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: colors
            }));
        }, 250);
    }
});
