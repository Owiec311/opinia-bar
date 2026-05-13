// Dodaj to globalnie (na początku pliku JS, poza funkcją)
let smileInProgress = false;

function smileEffect() {
    // Zabezpieczenie przed wielokrotnym kliknięciem
    if (smileInProgress) {
        return;
    }

    smileInProgress = true;

    // Znajdź przycisk i zablokuj go
    const button = document.querySelector(".secondary");
    if (button) {
        button.disabled = true;
        button.style.opacity = "0.6";
        button.style.cursor = "not-allowed";
    }

    // Wibracja telefonu
    if (navigator.vibrate) {
        navigator.vibrate([120, 60, 120]);
    }

    // ==========================================
    // WYWOŁANIE SERWERA FLASK
    // ==========================================
    // WAŻNE: fetch uruchamiamy w tle i NIE czekamy na odpowiedź.
    // Dzięki temu animacja pokazuje się natychmiast, nawet jeśli
    // Cloudflare Tunnel odpowiada z opóźnieniem.
    fetch("according-franchise-quarters-bond.trycloudflare.com/smile", {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    }).catch(error => {
        console.log("Błąd połączenia z serwerem:", error);
    });

    // ==========================================
    // ANIMACJA
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

    overlay.appendChild(emoji);
    overlay.appendChild(text);
    document.body.appendChild(overlay);

    // Dźwięk
    const audio = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
    );
    audio.volume = 0.4;

    // Na niektórych telefonach odtwarzanie może być zablokowane,
    // dlatego ignorujemy ewentualny błąd.
    audio.play().catch(() => {});

    // Ukrycie efektu
    setTimeout(() => {
        overlay.classList.add("hide");
    }, 2500);

    // Usunięcie efektu
    setTimeout(() => {
        overlay.remove();
    }, 3200);

    // Odblokowanie przycisku po 12 sekundach
    setTimeout(() => {
        smileInProgress = false;

        if (button) {
            button.disabled = false;
            button.style.opacity = "";
            button.style.cursor = "";
        }
    }, 12000);
}
