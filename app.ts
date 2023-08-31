import expressSession from 'express-session';
import express, { Express, Request, Response } from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import { deliveryController } from './controller/deliveryController';

const app = express();

// Configure Nunjucks.
const appViews = path.join(__dirname, "/views/")

const nunjucksConfig = {
    autoescape : true,
    noCache : true,
    express : app
};

nunjucks.configure(appViews, nunjucksConfig);

// Configure Express.
app.set("view engine", "html");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended : true}))

app.use(expressSession({secret : "NOT HARDCODED SECRET", cookie : {maxAge : 60000}}))

declare module "express-session" {
    interface SessionData {
        token : string
    }
}

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

deliveryController(app);