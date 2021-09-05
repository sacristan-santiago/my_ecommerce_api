import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    // const productos = producto.vista();
    const productos = ""
    const dataDinamica = {
        mostrarFormulario: false,
        mostrarTable: false,
        productos: productos,
        mostrarLoggin: true,
        mostrarChat: false,
    }
    res.render("main", dataDinamica)
})

router.get("/room", (req, res) => {
    // const productos = producto.vista();
    const productos = ""
    const dataDinamica = {
        mostrarFormulario: false,
        mostrarTable: false,
        productos: productos,
        mostrarLoggin: false,
        mostrarChat: true,
    }
    res.render("main", dataDinamica)
})

export default router;
