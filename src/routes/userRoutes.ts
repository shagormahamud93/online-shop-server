import { insertUser, getUsers } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.post("/auth/register", insertUser);
router.get("/auth/login", getUsers);

export default router;

