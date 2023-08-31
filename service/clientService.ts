import axios from "axios";
import { Client } from "../model/client";
import { AssignClient } from "../model/assignClient";
import { getProjectById, updateProject } from "./projectService";
import { Project } from "../model/project";
import session from "express-session";

export const getClients =  async function(token : string) : Promise<Client[]> {

    try {
        const response = await axios.get(`http://localhost:8080/api/client?token=${token}`);

        return response.data;

    } catch (e) {
        throw new Error("Could not get clients.");
    }
}

export const assignClient = async function (assigment : AssignClient, token : string) : Promise<void> {

    try {
        let project : Project;
        project = await getProjectById(assigment.projectId, token);

        // Updates the project with the new clientID.
        project.clientId = assigment.clientId;
        await updateProject(project, token);

    } catch (e) {
        console.error(e);
        throw new Error("Could not assign client to project.");
    }
}