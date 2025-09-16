import { Router } from "express";
import { register, login } from "../controllers/controllers";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ user: (req as any).user });
});

export default router;
