import express, { ErrorRequestHandler } from "express";
import session from 'express-session';
import passport from "passport";
import path from "path";
import * as http from "http";
import apiRouter from "../routes/index";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import Config from "../config";
import { logger } from "./logger/logger";
import { graphqlHTTP } from "express-graphql"
import { graphqlRoot, graphqlSchema } from "./graphql"


const usuario = Config.MONGO_ATLAS_USER;
const password = Config.MONGO_ATLAS_PASSWORD;
const dbName = Config.MONGO_ATLAS_DBNAME;
const clusterUrl = Config.MONGO_ATLAS_CLUSTER
const myURI = `mongodb+srv://${usuario}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`

const  oneMin = 1000 * 60; 
const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: myURI,
  }),
  secret: Config.SESSION_SECRET,
  saveUninitialized: true,
  cookie: { maxAge: oneMin*Config.SESSION_COOKIE_TIMEOUT },
  resave: true,
}

const app = express();
app.use(cookieParser())

const publicFolder = path.resolve(__dirname, "../../public");
app.use(express.static(publicFolder));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    graphiql: true,
  })
);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(`HUBO UN ERROR ${err.message}`);
    res.status(500).json({
      err:err.message
    })
}

app.use(errorHandler)

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

export const myHTTPServer = new http.Server(app);

export default app;