import {Router} from "express";
import productsRouter from "./productos";
import carritoRouter from "./carrito";

const router = Router();

router.use("/products", productsRouter);
router.use("/cart", carritoRouter);

export default router; 