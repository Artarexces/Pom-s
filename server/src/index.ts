import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db";
import routes from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Agrega esto después de app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


app.use("/", routes);
app.use("/api", routes);

app.get("/ping", (req, res) => {
  res.send("Servidor corriendo 🚀");
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor en escucha 🚀 | ${PORT}`);
});
