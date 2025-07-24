import React from 'react';
import AudioPlayer from './AudioPlayer';

function ChatMessage({ sender, originalText, translatedText, audioURL, isOwnMessage }) {
  return (
    <div
      className={`max-w-xs p-3 rounded-lg shadow-sm ${
        isOwnMessage ? 'bg-orange-500 text-white ml-auto' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <p className="text-sm">{originalText}</p>
      <p className="text-xs text-gray-600 mt-1">Translated: {translatedText}</p>
      {audioURL && <AudioPlayer audioURL={audioURL} />}
    </div>
  );
}

export default ChatMessage;