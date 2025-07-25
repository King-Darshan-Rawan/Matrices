import axios from "axios";

export const translateMessage = async (text, senderLang, receiverLang, sender, receiver) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/send-message/`, {
      params: {
        sender,
        receiver,
        sender_lang: senderLang,
        receiver_lang: receiverLang,
        msg: text,
      },
    });

    return response.data.translated_text;
  } catch (err) {
    console.error("Translation API failed:", err.message);
    return text; // fallback to original
  }
};
