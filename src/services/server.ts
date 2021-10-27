import express from "express";
import session from 'express-session';
import passport from "passport";
import path from "path";
import * as http from "http";
import apiRouter from "../routes/index";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import compression from "compression"

const  oneMin = 1000 * 60; 
const options = {
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
  saveUninitialized: true,
  cookie: { maxAge: oneMin*2 },
  resave: true,
}

const app = express();
app.use(cookieParser())

const publicFolder = path.resolve(__dirname, "../../public");
app.use(express.static(publicFolder));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression())


app.use("/api", apiRouter);


//CONFIGURANDO HANDLEBARS//
const layoutFolderPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayoutPath = path.resolve(__dirname, "../../views/layouts/index.hbs");
const partialsFolderPath = path.resolve(__dirname, "../../views/partials");

app.set("view engine", "hbs");
app.engine("hbs", handlebars ({
    layoutsDir: layoutFolderPath,
    defaultLayout: defaultLayoutPath,
    partialsDir: partialsFolderPath,
    extname: "hbs",
}))

const myHTTPServer = new http.Server(app);

export default myHTTPServer;