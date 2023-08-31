"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = require('express-session');
var express = require("express");
var path = require("path");
var nunjucks = require("nunjucks");
var app = express();
// Configure Nunjucks.
var appViews = path.join(__dirname, "/views/");
var nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};
nunjucks.configure(appViews, nunjucksConfig);
// Configure Express.
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "NOT HARDCODED SECRET", cookie: { maxAge: 60000 } }));
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
//# sourceMappingURL=app.js.map