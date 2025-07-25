
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js"; 


const PORT = process.env.PORT || 5000;


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB





app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
console.log(`Database connected successfully`);