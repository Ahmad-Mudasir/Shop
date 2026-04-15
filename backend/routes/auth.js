import express from "express";
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getMe, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUser, deleteUser } from "../controllers/authController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getMe);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id")
    .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticated, authorizeRoles("admin"), updateUser)
    .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);
export default router;