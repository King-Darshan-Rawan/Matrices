
import ChatMessage from "../model/chatModel.js";
import { translateMessage } from "../utils/translate.js"; 

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send-message", async (data) => {
      const {
        sender,
        receiver,
        message,
        senderLang,
        receiverLang,
      } = data;

      let translated = message;

      if (senderLang !== receiverLang) {
        translated = await translateMessage(
          message,
          senderLang,
          receiverLang,
          sender,
          receiver
        );
      }

      // Save to MongoDB
      const chat = new ChatMessage({
        sender,
        receiver,
        senderLang,
        receiverLang,
        originalMessage: message,
        translatedMessage: translated,
      });

      await chat.save();

      // Send to receiver
      io.emit("receive-message", {
        sender,
        receiver,
        message: translated,
        originalMessage: message,
        timestamp: chat.timestamp,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};