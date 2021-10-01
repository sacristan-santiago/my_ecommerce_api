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

//Hardcoded login id and pass
const myUser = 'santi';
const myPassword = 'rivercampeon';

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      const dataDinamica = {
        mostrarFormulario: true,
        username: req.session.username,
      }
      res.render("main", dataDinamica)
    }

    const dataDinamica = {
      mostrarLogin: true
    }
    res.render("main", dataDinamica)
});

router.post('/', (req, res) => {
  console.log(req.body)  
  const { username, password } = req.body;
    
    if (username == myUser && password == myPassword) {
        req.session.loggedIn = true;
        req.session.username= username
        
        const dataDinamica = {
          mostrarFormulario: true,
          username: req.session.username,
        }
        res.render("main", dataDinamica)
    } else {
        res.status(401).json({ msg: 'no estas autorizado' });
    }
       
});

export default router;

