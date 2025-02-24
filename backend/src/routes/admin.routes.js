import { Router } from "express";
import { registerAdmin } from "../controllers/admin.controllers.js";
import { loginAdmin } from "../controllers/admin.controllers.js";

const router = Router();

router.route("/register").post(registerAdmin);

router.route("/login").post(loginAdmin);

export default router;