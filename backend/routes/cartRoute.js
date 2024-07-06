import express from 'express';
import { addToCart, removeFromCart, getCart } from "../controllers/cartcontroller.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

// Route for adding items to the cart
cartRouter.post("/add", authMiddleware, addToCart);

// Route for removing items from the cart
cartRouter.post("/remove", authMiddleware, removeFromCart); // This can be changed to DELETE if it's more appropriate

// Route for getting the cart data
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
