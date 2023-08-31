import { Application, Request, Response } from "express"
import { ActiveSession, Credentials, User } from "../model/auth"

import { login, register } from "../service/authService"

export const authController = (app:Application) =>{
    app.get('/login', async (req: Request, res: Response) => {
        res.render('login');
    });

    app.post('/login', async(req: Request, res: Response) => {
        let data: Credentials = req.body;

        try {
            let activeSession: ActiveSession = await login(data);

            req.session.current = activeSession;

            res.redirect('/');
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

            res.render('login', req.body);
        }
    });
    
    app.get('/register', async (req: Request, res: Response) => {
        res.render('register');
    });
    
    app.post('/register', async (req: Request, res: Response) => {
        let data: User = req.body;

        try {
            await register(data)

            res.redirect('/login');
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

            res.render('register', req.body);
        }
    });
    
    app.get('/logout', async (req: Request, res: Response) => {
        req.session.destroy((e) => {
            if (e) {
                console.log(e)
            }

            res.redirect('/');
        });
    });
}