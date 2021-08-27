import {Router} from "express";
import productsRouter from "./productos";
import carritoRouter from "./carrito";

const router = Router();

router.use("/productos", productsRouter);
router.use("/carrito", carritoRouter);

export default router; 