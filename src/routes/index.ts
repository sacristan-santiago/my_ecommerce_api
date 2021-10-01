import {Router} from "express";
import productsRouter from "./productos";
import carritoRouter from "./carrito";
import chatRouter from "./chat";
import loginRouter from "./login"
import logoutRouter from "./logout"

const router = Router();

router.use("/productos", productsRouter);
router.use("/carrito", carritoRouter);
router.use("/chat", chatRouter);
router.use("/login", loginRouter)
router.use("/logout", logoutRouter)

export default router; 