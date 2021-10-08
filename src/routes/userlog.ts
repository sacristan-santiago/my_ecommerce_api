import {Router} from "express";
import passport from "passport";
import { isLoggedIn } from "../middlewares/auth";

const router = Router();

declare module 'express-session' {
    interface Session {
      loggedIn: boolean,
      contador: number,
      admin: boolean,
      username: string
    }
  }

router.get('/', isLoggedIn, (req, res) => {
  const dataDinamica = {
    mostrarFormulario: true,
  }
  res.render("main", dataDinamica)
})

router.get('/login',  (req, res) => {
  const dataDinamica = {
    mostrarLogin: true,
    username: req.session.username,
  }
  res.render("main", dataDinamica)
})

router.post('/login', passport.authenticate("login", 
{
  successRedirect: './',
  failureRedirect: './login'
}));

router.get('/register', (req, res) => {
  const dataDinamica = {
    mostrarRegister: true,
  }
  res.render("main", dataDinamica)
})

router.post('/register', passport.authenticate("signup"), (req, res, next) => {
  const dataDinamica = {
    mostrarRegisterOk: true,
  }
  res.render("main", dataDinamica)
})

declare module 'express-session' {
interface Session {
    loggedIn: boolean,
    contador: number,
    admin: boolean,
    username: string
}
}

router.get('/logout', (req, res) => {
    const dataDinamica = {
      mostrarLogout: true,
      username: req.session.username
    }

    req.session.destroy(()=>{});

    res.render("main", dataDinamica);
});

export default router;