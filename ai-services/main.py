from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import db
from ai.translate_utils import  load_translation_models,translate_message

from fastapi import  File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import shutil,os, uuid
import numpy as np
import whisper
# from uuid import uuid4
# import traceback
import tempfile



from gtts import gTTS

# Load models on app start
# load_translation_models()


# import subprocess
# print(subprocess.run(["ffmpeg", "-version"], capture_output=True).stdout.decode())


os.makedirs("media/sender", exist_ok=True)
os.makedirs("media/receiver", exist_ok=True)


# Load Whisper model once
model = whisper.load_model("base")  # or "small", "medium", "large"




app = FastAPI()
# Enable CORS so your frontend (Next.js) can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace * with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

collection = db.Try  # Example collection name
collection2 = db.Try2
collection3 = db.Try3



class ChatMessage(BaseModel):
    # sender: str
    # receiver: str
    text: str
    source_lang: str
    target_lang: str





@app.get("/")
def read_root():
    return {"message": "AI Backend is running"}








@app.post("/send-message/")
async def send_message(data: ChatMessage):
    try:
        print(f"Received message: {data.text} from {data.source_lang} to {data.target_lang}")


        translated_text =translate_message(data.text, data.source_lang, data.target_lang)

        print(f"Translated message: {translated_text}")


        # await collection2.insert_one(chat)
        return {"translated_message": translated_text}
    except Exception as e:
        return {"error": str(e)}
    




# @app.post("/upload-voice/")
# async def upload_voice(file: UploadFile = File(...)):
#     try:
#         # Generate unique filename
#         file_extension = file.filename.split(".")[-1]
#         unique_filename = f"{uuid.uuid4()}.{file_extension}"

#         # Save to sender folder
#         file_location = f"media/sender/{unique_filename}"
#         with open(file_location, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)

#         return {
#             "message": "Voice file uploaded successfully",
#             "file_path": file_location
#         }

#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})
    



@app.post("/voice-to-text/")
async def voice_to_text(file: UploadFile = File(...)):
    try:
        # Check if the file is a .wav file
        if not file.filename.endswith(".wav"):
            raise HTTPException(status_code=400, detail="Only .wav files are supported without ffmpeg.")
        
        # Save the uploaded file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_file_path = temp_file.name
        


        # Perform speech recognition
        result = model.transcribe(temp_file_path)  
        text = result["text"]


        # Clean up the temporary file
        os.remove(temp_file_path)
        return {"text": text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@app.post("/text-to-speech/")
def text_to_speech(text: str, lang: str, output_path: str ):
    try:
        # Create gTTS object
        tts = gTTS(text=text, lang=lang)

        # Save the audio file
        tts.save(output_path)

        print(f"Audio saved at: {output_path}")
        return output_path
    except Exception as e:
        print("Text-to-Speech Error:", str(e))
        return None

class VoiceMessage(BaseModel):
    file: str
    source_lang: str
    target_lang: str 


@app.post("/Voice-msg-translate/")
async def voice_msg_translate(data: VoiceMessage):
    try:


         # Generate unique filename
        # file_extension = VoiceMessage.file.filename.split(".")[-1]
        # unique_filename = f"{uuid.uuid4()}.mp3"


        file_location = data.file
    
    
        # Convert voice to text
        result = model.transcribe(file_location)
        text = result["text"]

        print(f"Transcribed text: {text}")

        # Translate the text
        translated_text = translate_message(text, data.source_lang, data.target_lang)

        print(f"Translated text: {translated_text}")

        # Convert translated text to speech
        audio_path = text_to_speech(translated_text, data.target_lang, output_path=f"media/receiver/{uuid.uuid4()}.mp3")

        print(f"Audio path: {audio_path}")
        if not audio_path:
            raise HTTPException(status_code=500, detail="Text-to-Speech conversion failed.")    
        
        return {
            "original_text": text,
            "translated_text": translated_text,
            "audio_path": audio_path
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))