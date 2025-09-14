import express from "express";
import {
  registerUser,
  loginUser,
  registerInstructor,
  checkAuth,
  logoutUser
} from "../controllers/authController.js";
const router = express.Router();

//auth roles
router.post("/register", registerUser);
router.post("/register/instructor", registerInstructor);
router.post("/login", loginUser);
router.get("/check", checkAuth);
router.post("/logout", logoutUser);

export default router;
