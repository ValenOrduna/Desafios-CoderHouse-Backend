import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import routerLogin from "./routes/login.routes.js";
import routerRegister from "./routes/register.routes.js";
import routerHome from "./routes/home.routes.js";
import routerLogout from "./routes/logout.routes.js";

const Store = FileStore(session);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "user",
    store: new Store({
      path: "./sessions",
      ttl: 600,
    }),
    secret: "c0d3r",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/login", routerLogin);
app.use("/register", routerRegister);
app.use("/home", routerHome);
app.use("/logout", routerLogout);

app.use(express.static("public"));

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () =>
  console.log(`El servidor esta escuchando en el puerto ${PORT}`)
);
