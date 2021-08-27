import express from "express";
import path from "path"
import * as http from "http";
import apiRouter from "../routes/index";

const app = express();

const publicFolder = path.resolve(__dirname, "../../public");
app.use(express.static(publicFolder));

const myServer = new http.Server (app);

app.use(express.json());
app.use("/api", apiRouter)

export default myServer;