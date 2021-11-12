import {Router} from "express";
import passport from "passport";
import { isLoggedIn } from "../middlewares/auth";
import { upload } from "../middlewares/multer"
import { registerMail } from "../middlewares/mailer"
import { usuariosAPI } from "../apis/usuarios";

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

router.post("/upload", isLoggedIn, upload.single("file"), async (req: any, res) => {
  if (req.file === undefined) return res.send("you must select a file")

  usuariosAPI.updatePhoto(req.user._id, req.file.id)

  const imgUrl = `http://localhost:8080/file/${req.file.filename}`
  return res.send(imgUrl)
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