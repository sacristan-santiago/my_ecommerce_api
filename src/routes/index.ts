import {Router} from "express";
import productsRouter from "./productos";
import carritoRouter from "./carrito";
import chatRouter from "./chat";
import usersRouter from "./usuarios";
import userLogRouter from "./userlog"
import {isLoggedIn} from "../middlewares/auth";
import { checkAdmin } from "../middlewares/admin";


const router = Router();

router.use("/productos", productsRouter);
router.use("/carrito", isLoggedIn, carritoRouter);
router.use("/chat", chatRouter);
router.use("/", userLogRouter);
router.use("/usuarios", checkAdmin, usersRouter);

router.get('/hola', (req, res) => {
    res.json({
      pid: process.pid,
      msg: 'HOLA',
    });
});
  
router.get('/slow', function (req, res) {
    console.log(`PID => ${process.pid} will work slow`);
    let sum = 0;
    for (let i = 0; i < 6e9; i++) {
        sum += i;
    }

    res.json({
        pid: process.pid,
        sum,
    });
});

export default router; 