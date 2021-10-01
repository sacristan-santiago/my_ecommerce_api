import {Router} from "express";

const router = Router();

declare module 'express-session' {
    interface Session {
      loggedIn: boolean,
      contador: number,
      admin: boolean,
      username: string
    }
  }

router.get('/', (req, res) => {
    const dataDinamica = {
      mostrarLogout: true,
      username: req.session.username
    }

    req.session.destroy(()=>{});

    res.render("main", dataDinamica);



});

export default router;

