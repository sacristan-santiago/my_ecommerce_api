import {Router} from "express";
import passport from "../middlewares/auth";
import { isLoggedIn } from "../middlewares/auth";
import { fork } from "child_process";
import { generateObj } from "../utils/randomnumbers" 
import path from "path";
import {modo, puerto} from "../index"
import { logger } from "../services/logger/logger";
import { loginGmailMail, loginMail, logoutMail } from "../middlewares/mailer";
 
const router = Router();

declare module 'express-session' {
    interface Session {
      loggedIn: boolean,
      contador: number,
      admin: boolean,
      username: string
    }
}

type Photos = {
  value: string;
};

type Emails = {
  value: string;
};

export interface User extends Express.User {
  contador?: number;
  displayName?: string;
  photos?: Photos[];
  emails?: Emails[];
}

router.get('/', isLoggedIn, (req, res) => {
  const dataDinamica = {
    mostrarFormulario: true,
  }
  res.render("main", dataDinamica)
})

router.get('/hola', (req, res) => {
  res.json({
    puerto: puerto,
    pid: process.pid,
    msg: 'HOLA',
  });
});

router.get('/warn', (req, res) => {
  res.json({
    msg: "Se emitio warn"
  });
  logger.warn("Se emite mensaje warn")
});

router.get('/info', (req, res) => {
  res.json({
    msg: "Se emitio info"
  });
  logger.info("Se emite mensaje info")
});

router.get('/error', (req, res) => {
  res.json({
    msg: "Se emitio error"
  });
  logger.error("Se emite mensaje error")
});

router.get("/random", (req, res) => {
  console.log(modo)
  let cant: any
  (req.query.cant) ? cant = Number(req.query.cant) : cant = 100000000;
  
  if (modo === "FORK") {
    const scriptPath = path.resolve(__dirname, '../utils/randomnumbers');
    const computo = fork(scriptPath);
    computo.send(cant);
    computo.on("message", (obj) => {
      res.json(obj)
    })
  } else {
    res.json(generateObj(cant))
  }
  
})



router.get('/login',  (req, res) => {
  const dataDinamica = {
    mostrarLogin: true,
    username: req.session.username,
  }
  res.render("main", dataDinamica)
})

router.get("/auth/facebook", passport.authenticate("facebook", {scope: ["email"]}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/datos',
    failureRedirect: '/api/fail',
  })
);

router.get('/fail', (req, res) => {
  res.render('main', {loginFail:true});
});

router.get('/datos', loginMail, loginGmailMail, (req, res) => {
  let foto = 'noPhoto';
  let email = 'noEmail';

  if (req.isAuthenticated()) {
    const userData: User = req.user;

    if (userData.photos) foto = userData.photos[0].value;

    if (userData.emails) email = userData.emails[0].value;

    const dataDinamica = {
      mostrarUsuario: true,
      nombre: userData.displayName,
      foto,
      email,
    }
    res.render("main", dataDinamica)

  } else {
    res.redirect('/api/login');
  }
});

router.get('/logout', logoutMail, (req, res) => {
    const dataDinamica = {
      mostrarLogout: true,
      username: req.session.username
    }

    req.session.destroy(()=>{});

    res.render("main", dataDinamica);
});

export default router;