const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const connection = require("./database/connection");

const SessionMiddleware = require("./middlewares/SessionMiddleware");

const Tought = require("./models/Tought");
const User = require("./models/User");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "session",
    secret: "my_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      httpOnly: true,
      //   expires: new Date(Date.now() + 360000),
    },
  })
);

app.use(flash());

app.use(express.static("public"));

// app.use((request, response, next) => {
//   try {
//     if (request.session.userId) response.locals.session = request.session;

//     next();
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message,
//     });
//   }
// });

app.use(SessionMiddleware.store);

connection
  // .sync()
  .sync({ force: true })
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));
