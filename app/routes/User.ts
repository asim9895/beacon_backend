import { emailLogin } from "../controllers/User/emailLogin";
import { register } from "../controllers/User/register";
import { emailLogin_validation, register_validation } from "../validators/User";
import express from "express";

const router = express.Router();

router.post("/register-user", register_validation, register);
router.post("/email-login-user", emailLogin_validation, emailLogin);

export default router;
