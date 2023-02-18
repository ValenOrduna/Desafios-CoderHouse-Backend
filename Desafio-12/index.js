import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import cluster from "cluster";
import routerRegister from "./routes/register.routes.js";
import routerLogin from "./routes/login.routes.js";
import routerHome from "./routes/home.routes.js";
import routerInfo from "./routes/info.routes.js";
import routerApi from "./routes/api.routes.js";
import { initializePassport } from "./passport/passport.config.js";

dotenv.config();

const app = express();

const PORT = process.argv[2];

if (process.argv[3] === "CLUSTER") {
  if (cluster.isPrimary) {
    for (let i = 0; i < 2; i++) {
      cluster.fork();
      console.log("Entro");
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} exit`);
      cluster.fork();
    });
  } else {
    app.listen(PORT, () =>
      console.log(`El servidor esta escuchando en el puerto ${PORT}`)
    );
  }
} else {
  app.listen(PORT, () =>
    console.log(`El servidor esta escuchando en el puerto ${PORT}`)
  );
}

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
app.use("/info", routerInfo);
app.use("/api", routerApi);

export { PORT };
