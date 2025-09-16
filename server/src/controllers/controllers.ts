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
        const user = new User({ username, password: hashed });
        await user.save();
        
        return res.status(201).json({ message: "Usuario registrado exitosamente", user });
               
    } catch (err) {
        console.error(`🛑 Error al registrar el usuario | ${(err as Error).message}`);
        return res.status(500).json({ message: "Error al registrar el usuario", err });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Nombre y contraseña son obligatorios" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "El usuario no existe" });
        } 
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Contraseña incorrecta" });
        const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({ access: token });
    } catch (err) {
        console.error(`🛑 Error al iniciar sesión | ${(err as Error).message}`);
        return res.status(500).json({ message: "Error al iniciar sesión", err });
    }
}