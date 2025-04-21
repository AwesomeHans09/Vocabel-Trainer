// Motivational messages for correct answers
const correctMessages = [
  "Super gemacht! 🫶",
  "Weiter so! 😁",
  "Du schaffst das! 🎯",
  "Klasse Leistung! 🏆",
  "Fantastisch! ❤️",
  "Prima! 🥰",
  "Ausgezeichnet! 😎",
  "Toll gemacht! 🤗",
  "Du bist spitze! ⚽",
  "Sei stolz auf dich! 🥹"
];

// Motivational messages for incorrect answers
const incorrectMessages = [
  "Bleib stark! 💪",
  "Glaube an dich! ✨",
  "Du schaffst das! 🎉",
  "Gib nicht auf! 🚀",
  "Jeder Schritt zählt! 👣",
  "Kopf hoch! 😊",
  "Mach weiter! ➡️",
  "Sei mutig! 🦁",
  "Deine Zeit kommt! ⏳",
  "Wachse über dich hinaus! 🌱"
];

export const getRandomMotivationalMessage = (isCorrect: boolean): string => {
  const messages = isCorrect ? correctMessages : incorrectMessages;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};