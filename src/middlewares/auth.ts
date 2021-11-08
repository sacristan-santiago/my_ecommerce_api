import passport from "passport";
import {VerifyFunction, StrategyOption, Strategy as FacebookStrategy } from "passport-facebook";
import { UsuarioModel} from "../schemas/usuario";
import Config from "../config"
import { NextFunction, Request, Response } from "express";

const strategyOptions: StrategyOption = {
  clientID: Config.FACEBOOK_APP_ID,
  clientSecret: Config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
}

const parametros = process.argv.slice(2)

if (parametros.length > 3)  {
    strategyOptions.clientID = parametros[2];
    strategyOptions.clientSecret = parametros[3];
}

const loginFunc: VerifyFunction = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  console.log('SALIO TODO BIEN');
  // console.log(accessToken);
  // console.log(refreshToken);
  // console.log(profile);
  return done(null, profile);
};
  
passport.use(new FacebookStrategy(strategyOptions, loginFunc));

export const isLoggedIn = (req: Request, res: Response, done: NextFunction) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'Unathorized' });

  done();
};

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
});

export default passport;
