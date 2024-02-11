import express from "express";
import * as UserController from "../controllers/userController.js";
import * as ProductController from "../controllers/productController.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";
import * as CartController from "../controllers/cartController.js";
import * as CartItemController from "../controllers/cartItemController.js";

const router = express.Router();

// User Routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/users", UserController.getAllUsers);

// Product Routes
router.post("/products", ProductController.createProduct);
router.get("/products/:id", ProductController.getProductById);
router.get("/products", ProductController.getAllProducts);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

// Cart Routes
router.use(jwtMiddleware);
router.post("/cart", CartController.createCart);
router.get("/cart/:id", CartController.getCartByUserId);
router.delete("/cart/:id", CartController.deleteCartByUserId);

// Cart Item Routes
router.use(jwtMiddleware);
router.use("/cartItem", CartItemController.setCartId);
router.post("/cartItem", CartItemController.createCartItem);
router.get("/cartItem", CartItemController.getCartItemsByCartId);
router.delete("/cartItem/:id", CartItemController.deleteCartItem);

export default router;
