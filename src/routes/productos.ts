import {Router} from "express";
import { productsController } from "../controllers/productos";
import { checkAdmin } from "../middleware/admin";

const router = Router();

router.get("/", productsController.getProducts);

// router.get("/:id", productsController.getProducts);

router.post("/", checkAdmin, productsController.checkProducts, productsController.addProducts);

router.put("/:id", checkAdmin, productsController.checkProducts, productsController.updateProducts);

router.delete("/:id", checkAdmin, productsController.deleteProducts);

router.get("/vista-test", productsController.generateProducts);

export default router; 