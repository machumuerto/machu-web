document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
    // Donut Button Interaction
    const donutBtn = document.getElementById('donut-btn');
    const homerMain = document.getElementById('homer-main');

    donutBtn.addEventListener('click', () => {
        // Simple "eat" animation trigger
        homerMain.style.transform = 'scale(1.1) rotate(-5deg)';
        setTimeout(() => {
            homerMain.style.transform = ''; // Reset to allow CSS animation to take over again (might need class toggle for cleaner reset)
        }, 200);

        createConfetti();
    });

    // ZZZ Animation generator
    const zzzContainer = document.getElementById('zzz-container');

    function createZzz() {
        if (!zzzContainer) return;

        const zzz = document.createElement('div');
        zzz.classList.add('zzz');
        zzz.innerText = 'Z';

        // Randomize position slightly
        const randomLeft = Math.random() * 50;
        zzz.style.left = `calc(50% + ${randomLeft}px)`;
        zzz.style.top = '20%';

        zzzContainer.appendChild(zzz);

        // Cleanup
        setTimeout(() => {
            zzz.remove();
        }, 3000);
    }

    setInterval(createZzz, 2000);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Wake Up Button Interaction
    const wakeUpBtn = document.querySelector('.secondary-button');
    const sleepingHomer = document.querySelector('.sleeping-homer');
    // zzzContainer is already defined above

    if (wakeUpBtn && sleepingHomer) {
        wakeUpBtn.addEventListener('click', () => {
            // Stop ZZZs temporarily
            if (zzzContainer) zzzContainer.style.opacity = '0';

            // Shake animation
            sleepingHomer.classList.add('shake-wake');

            // Swap Image
            const originalImageSrc = sleepingHomer.src;
            sleepingHomer.src = 'assets/homer_waking_up.png';

            // Show Mr. Burns
            const burnsContainer = document.getElementById('burns-container');
            if (burnsContainer) {
                burnsContainer.classList.add('active');
            }

            // Change button text
            const originalText = wakeUpBtn.innerText;
            wakeUpBtn.innerText = "OH NO!";
            wakeUpBtn.style.color = "var(--donut-pink)";
            wakeUpBtn.style.borderColor = "var(--donut-pink)";

            setTimeout(() => {
                sleepingHomer.classList.remove('shake-wake');
                sleepingHomer.src = originalImageSrc; // Revert image

                if (zzzContainer) zzzContainer.style.opacity = '1';

                // Hide Mr. Burns
                if (burnsContainer) {
                    burnsContainer.classList.remove('active');
                }

                wakeUpBtn.innerText = originalText;
                wakeUpBtn.style.color = "";
                wakeUpBtn.style.borderColor = "";
            }, 3000); // Increased duration to let Burns be seen
        });
    }
    // QA Section Interaction
    const qaBtn = document.getElementById('qa-toggle-btn');
    const qaImg = document.getElementById('qa-homer-img');
    const qaBubble = document.getElementById('qa-bubble');
    let isAnswered = false;

    if (qaBtn && qaImg && qaBubble) {
        qaBtn.addEventListener('click', () => {
            isAnswered = !isAnswered;

            if (isAnswered) {
                qaImg.src = 'assets/homer_answering.png';
                qaBubble.innerText = 'Pregúntale a Gabi mejor que a drast';
                qaBtn.innerHTML = '<span class="icon">❓</span> Ask Again';
            } else {
                qaImg.src = 'assets/homer_asking.png';
                qaBubble.innerText = '¿Cuánto tiempo se necesita para hacer una página web?';
                qaBtn.innerHTML = '<span class="icon">↩️</span> Reply';
            }

            // Add a little animation
            qaImg.classList.remove('pulse-homer');
            void qaImg.offsetWidth; // trigger reflow
            qaImg.classList.add('pulse-homer');
        });
    }
});

function createConfetti() {
    // Very simple confetti effect using emojis
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.innerText = '🍩';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '20px';
        confetti.style.zIndex = '100';
        confetti.style.transition = 'top 2s ease-in, transform 2s linear';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.top = '110vh';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 100);

        setTimeout(() => {
            confetti.remove();
        }, 2100);
    }
}
