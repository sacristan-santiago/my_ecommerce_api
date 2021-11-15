import passport from "passport";
import passportLocal, { IStrategyOptionsWithRequest, VerifyFunction } from "passport-local";
import { usuariosAPI } from "../apis/usuarios"
import { UsuarioModel} from "../schemas/usuario";
import { IStrategyOptions } from "passport-local";
import { userJoiSchema } from "../schemas/users";
import { logger } from "../services/logger/logger";

const LocalStrategy = passportLocal.Strategy;

const strategyOptionsLogin: IStrategyOptions = {
    usernameField: "username",
    passwordField: "password",
}

const strategyOptionsSignup: IStrategyOptionsWithRequest = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
}

const loginFunc = async (username: string, password: string, done: any): Promise<VerifyFunction> => {
    const user = await UsuarioModel.findOne({ username });
  
    if (!user) {
      logger.warn(`Login fail for username ${username}: user does not exist`)
      return done(null, false, { message: 'User or password invalid' });
    }
    if (!user.isValidPassword(password)) {
      logger.warn(`Login fail for username ${username}: password is not valid`)
      return done(null, false, { message: 'User or password invalid' });
    }

    logger.info(`User ${username} logged in at ${new Date()}`)
    return done(null, user);
  };

const signUpFunc = async (req: any, username: string, password: string, done: any): Promise<VerifyFunction> => {
  try {
    await userJoiSchema.validateAsync(req.body)

    const { username, password, password2, email, firstName, lastName, phoneNumber } = req.body;

    const query = {
      $or: [{ username: username }, { email: email }],
    };

    const user = await UsuarioModel.findOne(query);

    if (user) {
      logger.warn(
        `Singup Fail for username ${username}: Username or email already exists`
      )
      return done(null, false, 'User already exists');
    } else {
      const userData = {
        username,
        password,
        email,
        firstName,
        lastName,
        phoneNumber
      };

      const newUser = await usuariosAPI.addUser(userData);

      return done(null, newUser);
    }
  } catch (err: any) {
        logger.error(err.message);
        return done(err);
  }
};
  
export const isLoggedIn = (req: any, res: any, done: any) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });
  console.log(req.user)

  done();
};

//se puede copiar isloggedIn para is admin


passport.use("login", new LocalStrategy(strategyOptionsLogin, loginFunc));
passport.use("signup", new LocalStrategy(strategyOptionsSignup, signUpFunc));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UsuarioModel.findById(userId, function (err: any, user: any) {
    done(err, user);
  });
});
