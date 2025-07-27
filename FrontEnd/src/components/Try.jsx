import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import VoiceRecorder from './VoiceRecorder';
import BadgePanel from './BadgePanel';
import { sendTextMessage, sendAudioMessage } from '../utils/api';



function Dashboard({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Dummy initial messages
    setMessages([
      {
        id: 1,
        sender: 'mentee',
        originalText: 'Hello!',
        translatedText: '¡Hola!',
        audioURL: '/audio/hello.mp3',
      },
      {
        id: 2,
        sender: 'mentor',
        originalText: 'Hi there!',
        translatedText: '¡Hola!',
        audioURL: '/audio/hi.mp3',
      },
    ]);
  }, []);

  const handleSendText = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await sendTextMessage({
        originalText: newMessage,
        sender: "ani",
      });
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "ani", ...response },
      ]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending text:', error);
    }
  };

  const handleSendAudio = async (audioBlob) => {
    try {
      const response = await sendAudioMessage(audioBlob);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "ani", ...response },
      ]);
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-white">

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                sender={msg.sender}
                originalText={msg.originalText}
                translatedText={msg.translatedText}
                audioURL={msg.audioURL}
                isOwnMessage={msg.sender === "ani"}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendText}
              className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Send
            </button>
            <VoiceRecorder onSendAudio={handleSendAudio} />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
