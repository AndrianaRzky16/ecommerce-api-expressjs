import express from "express";
import * as UserController from "../controllers/userController.js";
import * as ProductController from "../controllers/productController.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";
import * as CartController from "../controllers/cartController.js";
import * as CartItemController from "../controllers/cartItemController.js";
import * as orderControl from "../controllers/orderController.js";

const router = express.Router();

// User Routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
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
router.get("/cart", CartController.getCartByUserId);
router.delete("/cart/:id", CartController.deleteCartByUserId);

// Cart Item Routes
router.use(jwtMiddleware);
router.use("/cartItem", CartItemController.setCartId);
router.post("/cartItem", CartItemController.createCartItem);
router.get("/cartItem", CartItemController.getCartItemsByCartId);
router.delete("/cartItem/:id", CartItemController.deleteCartItem);

// Order Routes
router.use(jwtMiddleware);
router.post("/order", orderControl.createOrder);
router.post("/orderItems", orderControl.createOrderItem);
router.post("/payment", orderControl.createPayment);
router.get("/history/orderItems/:id", orderControl.historyOrdersItems);
router.get("/history/payment", orderControl.historyPayment);

// Error Handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default router;
