import axios from 'axios';

export const sendTextMessage = async (message) => {
  // Simulate API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        originalText: message.originalText,
        translatedText: `Translated: ${message.originalText}`,
        audioURL: '/audio/dummy.mp3',
      });
    }, 500);
  });
};

export const sendAudioMessage = async (audioBlob) => {
  // Simulate API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        originalText: 'Voice message',
        translatedText: 'Translated voice message',
        audioURL: '/audio/dummy.mp3',
      });
    }, 500);
  });
};