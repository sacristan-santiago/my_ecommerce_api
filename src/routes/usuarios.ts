import {Router} from "express";
import { UsuarioModel } from "../schemas/usuario";


const router = Router();

router.get("/", async (req, res) => {
    const data = await UsuarioModel.find({});
    res.json({data})
})

export default router; 