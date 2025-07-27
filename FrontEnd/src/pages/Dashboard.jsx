import React, { useState, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import VoiceRecorder from '../components/VoiceRecorder';
import BadgePanel from '../components/BadgePanel';
import { sendTextMessage, sendAudioMessage } from '../utils/api';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import SomeComponent from "../components/SomeComponent";
import MentorList from '../components/MentorList';
import Requests from './Requests'
import Try from '../components/Try';

const Dashboard = () => {

  const [showRequests, setShowRequests] = useState(false);

  const toggleView = () => setShowRequests(prev => !prev);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onBellClick={toggleView} />
      <main className="flex-grow">
  <div className="flex h-screen bg-gray-100">
    
    {/* Left Sidebar */}
    <div className="w-[25%] border-r border-gray-300 overflow-y-auto bg-white">
      <MentorList />
    </div>

    {/* Right Chat Area */}
    <div className="flex-grow">
      {showRequests ? <Try /> : <Requests />}
    
    </div>
    <BadgePanel 
    // user={user} 
    />

  </div>
</main>

      <Footer />
    </div>
  );
};

export default Dashboard;

// function Dashboard({ user }) {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   // useEffect(() => {
//   //   // Dummy initial messages
//   //   setMessages([
//   //     {
//   //       id: 1,
//   //       sender: 'mentee',
//   //       originalText: 'Hello!',
//   //       translatedText: '¡Hola!',
//   //       audioURL: '/audio/hello.mp3',
//   //     },
//   //     {
//   //       id: 2,
//   //       sender: 'mentor',
//   //       originalText: 'Hi there!',
//   //       translatedText: '¡Hola!',
//   //       audioURL: '/audio/hi.mp3',
//   //     },
//   //   ]);
//   // }, []);

//   // const handleSendText = async () => {
//   //   if (!newMessage.trim()) return;
//   //   try {
//   //     const response = await sendTextMessage({
//   //       originalText: newMessage,
//   //       sender: user.role,
//   //     });
//   //     setMessages((prev) => [
//   //       ...prev,
//   //       { id: Date.now(), sender: user.role, ...response },
//   //     ]);
//   //     setNewMessage('');
//   //   } catch (error) {
//   //     console.error('Error sending text:', error);
//   //   }
//   // };

//   // const handleSendAudio = async (audioBlob) => {
//   //   try {
//   //     const response = await sendAudioMessage(audioBlob);
//   //     setMessages((prev) => [
//   //       ...prev,
//   //       { id: Date.now(), sender: user.role, ...response },
//   //     ]);
//   //   } catch (error) {
//   //     console.error('Error sending audio:', error);
//   //   }
//   // };

//   if (!user) {
//     return (
      
//       <div className="flex items-center justify-center h-screen">
//          <Navbar />
//         <p className="text-gray-500 text-lg">Loading user...</p>
//         <Footer />
//       </div>
//     );
//   }

// export default Dashboard();

//   return (
//     <div className="flex flex-col h-screen bg-white">
//        <Navbar />
//       <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
//         <div className="flex-1 flex flex-col p-4">
//           <div className="flex-1 overflow-y-auto space-y-3">
//             {messages.map((msg) => (
//               <ChatMessage
//                 key={msg.id}
//                 sender={msg.sender}
//                 originalText={msg.originalText}
//                 translatedText={msg.translatedText}
//                 audioURL={msg.audioURL}
//                 isOwnMessage={msg.sender === user.role}
//               />
//             ))}
//           </div>
//           <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//               placeholder="Type your message..."
//             />
//             <button
//               onClick={handleSendText}
//               className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600"
//             >
//               Send
//             </button>
//             <VoiceRecorder onSendAudio={handleSendAudio} />
//           </div>
//         </div>
//         <BadgePanel user={user} />
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Dashboard;
