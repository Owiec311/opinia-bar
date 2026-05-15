function smileEffect() {

    // Wibracja telefonu
    if (navigator.vibrate) {
        navigator.vibrate([120, 60, 120]);
    }

    // ==========================================
    // WYWOŁANIE SERWERA FLASK W TLE
    // ==========================================
    // Nie czekamy na odpowiedź, więc animacja uruchamia się od razu.
    fetch("https://smile.owiectech.uk/smile")
        .catch(error => {
            console.log("Błąd połączenia z serwerem:", error);
        });

    // ==========================================
    // TWORZENIE OVERLAY
    // ==========================================
    const overlay = document.createElement("div");
    overlay.className = "smile-overlay";

    // Emoji
    const emoji = document.createElement("div");
    emoji.className = "smile-emoji";
    emoji.innerHTML = "😄";

    // Tekst
    const text = document.createElement("div");
    text.className = "smile-text";
    text.innerHTML = "Dziękujemy za opinię ❤️";

    // Konfetti
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = (Math.random() * 0.5) + "s";
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        overlay.appendChild(confetti);
    }

    // Dodanie elementów do overlay
    overlay.appendChild(emoji);
    overlay.appendChild(text);

    // Dodanie overlay do strony
    document.body.appendChild(overlay);

    // ==========================================
    // DŹWIĘK
    // ==========================================
    const audio = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
    );

    audio.volume = 0.4;
    audio.play().catch(() => {});

    // ==========================================
    // UKRYCIE ANIMACJI
    // ==========================================
    setTimeout(() => {
        overlay.classList.add("hide");
    }, 2500);

    // ==========================================
    // USUNIĘCIE Z DOM
    // ==========================================
    setTimeout(() => {
        overlay.remove();
    }, 3200);
}
