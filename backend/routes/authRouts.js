import express from "express";
import {
  registerUser,
  loginUser,
  registerInstructor
} from "../controllers/authController.js";
const router = express.Router();

//auth roles
router.post("/register", registerUser);
router.post("/register/instructor", registerInstructor);
router.post("/login", loginUser);

export default router;
