import { Application, Request, Response } from "express";
import { AssignClient } from "../model/assignClient";
import { Client } from "../model/client";

import { assignClient, getClients } from "../service/clientService";
import { getProjects } from "../service/projectService";
import { Project } from "../model/project";
import session from "express-session";

export const clientController = function(app : Application) {

    app.get("/client/assign-project", async (req : Request, res : Response) => {

        try {

            let clients : Client[];
            let projects : Project[];
            clients = await getClients(req.session.token);
            projects =  await getProjects(req.session.token);

            res.render("assign-client-project", {
                clients : clients,
                projects : projects,
            });

        } catch (e) {
            console.error(e);


            res.locals.errormessage = "A problem occurred generating this page.";
            res.render("assign-client-project");
        }
    });

    app.post("/client/assign-project", async (req : Request, res : Response) => {

        let data : AssignClient = req.body;

        try {

            await assignClient(data, req.session.token);
            res.redirect("/client/assign-project-success");

        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

            try {
                let clients : Client[];
                let projects : Project[];
                clients = await getClients(req.session.token);
                projects =  await getProjects(req.session.token);

                res.render("assign-client-project", {
                    clients : clients,
                    projects : projects,
                    form : req.body
                });

            } catch (e) {
                console.error(e);

                res.locals.errormessage = e.message;

                res.render("assign-client-project", {
                    form : req.body
                });
            }
        }
    });

    app.get("/client/assign-project-success", async (req : Request, res : Response) => {

        res.render("assign-client-project-success");
    });
}