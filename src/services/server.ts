import express from "express";
import path from "path"
import * as http from "http";
import apiRouter from "../routes/index";
import handlebars from "express-handlebars";

const app = express();

const publicFolder = path.resolve(__dirname, "../../public");
app.use(express.static(publicFolder));

app.use(express.json());
app.use("/api", apiRouter)

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