import {Router} from "express";
import productsRouter from "./productos";
import carritoRouter from "./carrito";
import chatRouter from "./chat";
import usersRouter from "./usuarios";
import userLogRouter from "./userlog"
import {isLoggedIn} from "../middlewares/auth";


const router = Router();

router.use("/productos", productsRouter);
router.use("/carrito", carritoRouter);
router.use("/chat", chatRouter);
router.use("/", userLogRouter);
router.use("/usuarios", isLoggedIn, usersRouter);

export default router; 