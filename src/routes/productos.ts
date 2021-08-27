import {Router} from "express";
import { productsController } from "../controllers/productos";
import { checkAdmin } from "../middleware/admin";

const router = Router();

router.get("/listar", productsController.getProducts);

router.get("/listar/:id", productsController.getProducts);

router.post("/agregar", checkAdmin, productsController.checkProducts, productsController.addProducts);

router.put("/actualizar/:id", checkAdmin, productsController.checkProducts, productsController.updateProducts);

router.delete("/borrar/:id", checkAdmin, productsController.deleteProducts);

export default router; 