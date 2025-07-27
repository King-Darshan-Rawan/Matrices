
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js"; 

dotenv.config();
const app = express();

import userRoutes from "./routes/userRoute.js";
import progressRoutes from "./routes/progressRoute.js";
import requestRoutes from "./routes/requestRoute.js";

const server = http.createServer(app);


import { setupSocket } from "./socket/socket.js";




const io = new Server(server, {
  cors: {
    origin: "*", // replace with frontend URL in production
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

setupSocket(io)



connectDB(); // Connect to MongoDB


app.use('/api/users', userRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/requests', requestRoutes);



app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
console.log(`Database connected successfully`);