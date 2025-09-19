import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db";
import routes from "./routes/routes";

if (process.env.NODE_ENV !== "production") {
    process.loadEnvFile();
}

const app = express();
const PORT = process.env.PORT || 5500;


app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
    credentials: true
}));
app.use(express.json());

app.use("/", routes);

app.get("/ping", (req, res) => {
  res.send("Servidor corriendo 🚀");
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor en escucha 🚀 | ${PORT}`);
});
