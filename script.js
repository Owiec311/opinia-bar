function smileEffect() {

    // Wibracja telefonu
    if (navigator.vibrate) {
        navigator.vibrate([120, 60, 120]);
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
    for(let i = 0; i < 30; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.animationDelay =
            (Math.random() * 0.5) + "s";

        confetti.style.transform =
            `rotate(${Math.random()*360}deg)`;

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

    audio.play();

    // Ukrycie efektu
    setTimeout(() => {
        overlay.classList.add("hide");
    }, 2500);

    // Usunięcie
    setTimeout(() => {
        overlay.remove();
    }, 3200);
}