import express from "express";
import { getproducts, newProduct, getSingleProduct, updateProduct, deleteProduct } from "../controllers/productControllers.js"
import { isAuthenticated, authorizeRoles } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/products").get(isAuthenticated, getproducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/new").post(isAuthenticated, authorizeRoles("admin"), newProduct);
router.route("/admin/product/:id").put(isAuthenticated, authorizeRoles("admin"), updateProduct);
router.route("/admin/product/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
export default router;
