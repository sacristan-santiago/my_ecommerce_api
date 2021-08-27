import {Router} from "express";

const router = Router();

router.get("/", (req, res)=> {
    res.json("GET A CARRITO");
})

router.get("/", (req, res)=> {
    res.json("POST A CARRITO");
})

router.get("/", (req, res)=> {
    res.json("PUT A CARRITO");
})

router.get("/", (req, res)=> {
    res.json("DELETE A CARRITO");
})
export default router; 