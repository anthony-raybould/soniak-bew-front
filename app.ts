import expressSession from 'express-session';
import express, { Express, Request, Response } from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import { deliveryController } from './controller/deliveryController';
import { authController } from './controller/authController';
import { salesemployeeController } from './controller/salesemployeeController';
import authMiddleware from './middleware/auth';
import { ActiveSession } from './model/auth';
import { clientController } from './controller/clientController';

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
        current?: ActiveSession;
    }
}

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

authController(app);
app.get('/forbidden', (req: Request, res: Response) => {
    res.render('forbidden', { username : req.session.current?.username });
});


app.use(authMiddleware);

deliveryController(app);
salesemployeeController(app)
clientController(app);
app.get('/', (req: Request, res: Response) => {
    res.render('index', { username : req.session.current?.username });
});
