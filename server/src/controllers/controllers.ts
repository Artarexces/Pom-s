import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Nombre y contraseña son obligatorios" });
        }
        const existUser = await User.findOne({ username });
        if (existUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });
        const token = jwt.sign({ username }, JWT_SECRET);
        await user.save();
        
        return res.status(201).json({ message: "Usuario registrado exitosamente", user, token });
               
    } catch (err) {
        console.error(`🛑 Error al registrar el usuario | ${(err as Error).message}`);
        return res.status(500).json({ message: "Error al registrar el usuario", err });
    }
}