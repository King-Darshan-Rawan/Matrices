import Chat from "../model/chatModel.js";



export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send-message", async (data) => {
      const {
        sender,
        receiver,
        messageType,
        text,
        audioUrl,
        senderLang,
        receiverLang,
      } = data;

      let chatData = {
        sender,
        receiver,
        messageType,
        senderLang,
        receiverLang,
      };

      if (messageType === "text") {
        if (senderLang === receiverLang) {
          chatData.text = text;
        } else {
          // Call FastAPI for translation
          const res = await axios.post("http://localhost:8000/send-message", {
            text,
            source_lang: senderLang,
            target_lang: receiverLang,
          });

          chatData.text = text;
          chatData.translatedText = res.data.translated_text;
        }
      }


      // Case 2: Voice Message
      if (messageType === "voice") {
        // audioUrl: path to uploaded voice file (original)
        chatData.originalAudioUrl = audioUrl;

        // Call FastAPI to transcribe, translate, convert to TTS
        const res = await axios.post("http://localhost:8000/Voice-msg-translate", {
          file: audioUrl,
          source_lang: senderLang,
          target_lang: receiverLang,
        });

        chatData.originalText = res.data.original_text;
        chatData.translatedText = res.data.translated_text;
        chatData.translatedAudioUrl = res.data.audio_path;
      }

      const newMessage = await Chat.create(chatData);


      // Send to receiver
      io.to(receiver).emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};