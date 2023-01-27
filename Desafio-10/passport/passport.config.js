import passport from "passport";
import local from "passport-local";
import User from "../models/User.js";
import { createHash, isValid } from "../utils/crypt.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (user) return done(null, false);
          const newUser = {
            username,
            email: req.email,
            password: createHash(password),
          };

          try {
            const user = await User.create(newUser);
            return done(null, user);
          } catch (err) {
            done(err);
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });

  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false);
        if (!isValid(user, password)) return done(null, false);
        return done(null, user);
      } catch (err) {
        done(err);
      }
    })
  );
};
