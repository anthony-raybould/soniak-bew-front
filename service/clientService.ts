import axios from "axios";
import { Client } from "../model/client";
import { AssignClient } from "../model/assignClient";
import { getProjectById, updateProject } from "./projectService";
import { Project } from "../model/project";

export const getClients =  async function() : Promise<Client[]> {

    try {
        const response = await axios.get("http://localhost:8080/api/client");

        return response.data;

    } catch (e) {
        throw new Error("Could not get clients.");
    }
}

export const assignClient = async function (assigment : AssignClient) : Promise<void> {

    try {
        let project : Project;
        project = await getProjectById(assigment.projectId);

        // Updates the project with the new clientID.
        project.clientId = assigment.clientId;
        updateProject(project);

    } catch (e) {
        console.error(e);
        throw new Error("Could not assign client to project.");
    }
}