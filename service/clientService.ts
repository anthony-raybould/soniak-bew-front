import axios from "axios";
import type { Client } from "../model/client";
import type { AssignClient } from "../model/assignClient";
import { getProjectById, updateProject } from "./projectService";
import type { Project } from "../model/project";

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

export const getHighestValueClient =  async function(token : string) : Promise<string> {

    try {
        const response = await axios.get(`http://localhost:8080/api/client/highestvalue?token=${token}`);

        return response.data;

    } catch (e) {
        throw new Error("Could not get highest value client.");
    }
}