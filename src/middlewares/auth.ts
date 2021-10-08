import passport from "passport";
import passportLocal, { IStrategyOptionsWithRequest, VerifyFunction } from "passport-local";
import { UsuarioModel} from "../schemas/usuario";
import { IStrategyOptions } from "passport-local";

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
      return done(null, false, { message: 'User does not exist' });
    }
    if (!user.isValidPassword(password)) {
      return done(null, false, { message: 'Password is not valid.' });
    }
    console.log('SALIO TODO BIEN, TE LOGUEASTE!!');
    return done(null, user);
  };

const signUpFunc = async (req: any, username: string, password: string, done: any): Promise<VerifyFunction> => {
  try {
    const { username, password, password2, email, firstName, lastName } = req.body;
    console.log(req.body)
    
    if (!username || !password || !password2 || !email || !firstName || !lastName || password != password2) {
      console.log('Invalid body fields');
      return done(null, false);
    }

    const query = {
      $or: [{ username: username }, { email: email }],
    };

    const user = await UsuarioModel.findOne(query);

    if (user) {
      console.log('User already exists');
      console.log(user);
      return done(null, false, 'User already exists');
    } else {
      const userData = {
        username,
        password,
        email,
        firstName,
        lastName,
      };

      const newUser = new UsuarioModel(userData);

      await newUser.save();

      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
};
  
export const isLoggedIn = (req: any, res: any, done: any) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });
  console.log(req.user)

  done();
};


passport.use("login", new LocalStrategy(strategyOptionsLogin, loginFunc));
passport.use("signup", new LocalStrategy(strategyOptionsSignup, signUpFunc));

passport.serializeUser((user: any, done) => {
  // console.log(user);
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UsuarioModel.findById(userId, function (err: any, user: any) {
    done(err, user);
  });
});
