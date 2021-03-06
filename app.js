const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");
const session = require("express-session")
const configRoutes = require("./routes");

const exphbs = require("express-handlebars");

const Handlebars = require("handlebars");

var path = require ("path");
const viewPath = path.join(__dirname, "/views");


const handlebarsInstance = exphbs.create({
  defaultLayout: "main",
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

app.set("views", viewPath);


app.use(session({
  name: "AuthCookie",
  secret: "RMS project",
  resave: false,
  saveUninitialized: true

}))

//const isAuth = (req, res, next) => {
  // console.log(req.session.authority)
  // if (req.path=='/') {
  //   console.log("trying to access homepage")
  //   next();
  // }
 // if (req.path!=='/' && (req.session.authority == undefined || req.session.authority==false)) {
    // console.log("Not logged in!")
   // res.render('errorPage', { e: { statusCode: "401", error: "You are not logged in, please login", redirect: "/" } })
    //  next();
  //} else {
    // console.log("logged in")
   // next();
 // }
//}
//app.use(isAuth);
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
