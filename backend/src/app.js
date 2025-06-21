import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import mongoose from "mongoose";

import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const httpServer = createServer(app);
const io = connectToSocket(httpServer);

app.set("port", (process.env.PORT || 3000));

app.use(cors());
app.use(express.json({limit: "50kb"}));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

app.use("/api/v1/user", userRoutes);

app.get("/home", (req, res) => {
    return res.json({ messsage: "Welcome to the home page!" });
});

const start = async () => {
    app.set("mongo_user");
    const connectDB = await mongoose.connect("mongodb+srv://jashusunny2004:rExi8HIjLSXPN1nJ@converge.owtkcut.mongodb.net/?retryWrites=true&w=majority&appName=Converge");
    console.log(`Connected to MongoDB: ${connectDB.connection.host}`);
    httpServer.listen(app.get("port"), () => {
        console.log("Server is running on port 3000");
    });
    
}

start();