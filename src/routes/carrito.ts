import {Router} from "express";
import { carritoController } from "../controllers/carrito";
import { checkAdmin } from "../middlewares/admin";
import { isLoggedIn } from "../middlewares/auth";

const router = Router();

router.get('/', carritoController.getCartByUser);

router.post('/add', carritoController.addProduct);

router.post('/delete', carritoController.deleteProduct);

router.post('/submit', carritoController.submitCart);

export default router; 