import { Router } from "express";
import { registerAdmin } from "../controllers/admin.controllers.js";
import { loginAdmin } from "../controllers/admin.controllers.js";
import { logoutAdmin } from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerAdmin);

router.route("/login").post(loginAdmin);

//secured routes
router.route("/logout").post(verifyJWT, logoutAdmin);

export default router;