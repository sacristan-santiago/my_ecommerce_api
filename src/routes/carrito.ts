import {Router} from "express";
import { carritoController } from "../controllers/carrito";
import { checkAdmin } from "../middleware/admin";

const router = Router();

router.get("/listar", carritoController.getProductosCarrito);

router.get("/listar/:id", carritoController.getProductosCarrito);

router.post("/guardar/:id", carritoController.addProductoCarrito);

router.delete("/borrar/:id", carritoController.deleteProductoCarrito);

export default router; 