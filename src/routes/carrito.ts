import {Router} from "express";
import { carritoController } from "../controllers/carrito";
import { checkAdmin } from "../middlewares/admin";

const router = Router();

router.get("/", carritoController.getProductosCarrito);

router.get("/:id", carritoController.getProductosCarrito);

router.post("/:id", carritoController.addProductoCarrito);  

router.delete("/:id", carritoController.deleteProductoCarrito);

export default router; 