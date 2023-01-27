import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import routerRegister from "./routes/register.routes.js";
import routerLogin from "./routes/login.routes.js";
import routerHome from "./routes/home.routes.js";
import { initializePassport } from "./passport/passport.config.js";

dotenv.config();

const app = express();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dezvmft.mongodb.net/users`;

mongoose.set("strictQuery", true);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const configSession = session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dezvmft.mongodb.net/users-session`,
  }),
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 600000 },
  resave: true,
  saveUninitialized: true,
});

app.use(express.static("public"));
app.use(configSession);
app.use(express.json());
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use("/register", routerRegister);
app.use("/login", routerLogin);
app.use("/home", routerHome);

const port = process.env.PORT ?? 8080;

app.listen(port, () =>
  console.log(`El servidor esta escuchando en el puerto ${port}`)
);
