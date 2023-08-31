import type { Application, Request, Response } from "express";
import type { AssignClient } from "../model/assignClient";
import type { Client } from "../model/client";

import { assignClient, getClients, getHighestValueClient } from "../service/clientService";
import { getProjects } from "../service/projectService";
import type { Project } from "../model/project";

export const clientController = function(app : Application) {

    app.get("/client/assign-project", async (req : Request, res : Response) => {

        try {

            let clients : Client[] = await getClients(req.session.token);
            let projects : Project[] =  await getProjects(req.session.token);

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
                let clients : Client[] = await getClients(req.session.token);;
                let projects : Project[] =  await getProjects(req.session.token);;

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

    app.get("/client/highest-value", async (req : Request, res : Response) => {

        try {

            let clients : Client[] = await getClients(req.session.token);
            let projects : Project[] =  await getProjects(req.session.token);

            let highestValueClient : string = await getHighestValueClient(req.session.token);

            res.render("highest-value-client", {
                highestValueClient : highestValueClient
            });

        } catch (e) {
            console.error(e);


            res.locals.errormessage = "A problem occurred generating this page.";
            res.render("highest-value-client");
        }
    });
}