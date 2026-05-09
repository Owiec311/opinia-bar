let smileInProgress = false;
function smileEffect() {

    // Wibracja telefonu
    if (navigator.vibrate) {
        navigator.vibrate([120, 60, 120]);
    }
    // Zabezpieczenie przed wielokrotnym kliknięciem
    if (smileInProgress) {
        return;
    }

    smileInProgress = true;

    // Wibracja telefonu
    if (navigator.vibrate) {
        navigator.vibrate([120, 60, 120]);
    }
    // ==========================================
    // WYWOŁANIE LOKALNEGO SERWERA FLASK
    // ==========================================
    // ZMIEŃ 192.168.1.50 na adres IP komputera
    // lub Raspberry Pi, na którym działa app.py
    fetch("https://elected-vincent-environmental-sox.trycloudflare.com/smile")
        .catch(error => console.log("Błąd połączenia z serwerem:", error));
    // Znajdź przycisk i zablokuj go
    const button = document.querySelector(".secondary");
    if (button) {
        button.disabled = true;
        button.style.opacity = "0.6";
        button.style.cursor = "not-allowed";
    }
    // Overlay
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

        confetti.style.animationDelay =
            (Math.random() * 0.5) + "s";

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        overlay.appendChild(confetti);
    }

    overlay.appendChild(emoji);
    overlay.appendChild(text);

    document.body.appendChild(overlay);

    // Dźwięk
    const audio = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
    );

    audio.volume = 0.4;

    // Bezpieczne odtwarzanie
    audio.play().catch(() => {});

    // Ukrycie efektu
    setTimeout(() => {
        overlay.classList.add("hide");
    }, 2500);

    // Usunięcie
    setTimeout(() => {
        overlay.remove();
    }, 3200);
     // ... tutaj pozostaje Twój kod konfetti i animacji ...

    // Odblokowanie po 12 sekundach
    setTimeout(() => {
        smileInProgress = false;

        if (button) {
            button.disabled = false;
            button.style.opacity = "";
            button.style.cursor = "";
        }
    }, 12000);
}
