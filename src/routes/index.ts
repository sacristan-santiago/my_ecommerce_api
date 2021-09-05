import {Router} from "express";
import productsRouter from "./productos";
import carritoRouter from "./carrito";
import chatRouter from "./chat";

const router = Router();

router.use("/productos", productsRouter);
router.use("/carrito", carritoRouter);
router.use("/chat", chatRouter);

export default router; 