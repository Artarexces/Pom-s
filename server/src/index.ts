import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db";

process.loadEnvFile();

const app = express();
const PORT = process.env.PORT || 5500;


app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor en escucha 🚀 | ${PORT}`);
});
