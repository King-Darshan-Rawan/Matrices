import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    senderLang: String,
    receiverLang: String,
    originalMessage: String,
    translatedMessage: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;