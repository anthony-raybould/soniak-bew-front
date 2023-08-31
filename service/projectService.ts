import axios from "axios";
import type { Project } from "../model/project";

export const getProjects =  async function(token : string) : Promise<Project[]> {

    try {
        const response = await axios.get(`http://localhost:8080/api/project?token=${token}`);

        return response.data;

    } catch (e) {
        throw new Error("Could not get projects.");
    }
}

export const getProjectById = async function(projectId : number, token : string) : Promise<Project> {

    try {
        const response = await axios.get(`http://localhost:8080/api/project/${projectId}?token=${token}`);

        return response.data;

    } catch (e) {
        console.error(e);
        throw new Error("Could not get project.");
    }
}

export const updateProject = async function (project : Project, token : string) : Promise<void> {

    try {
        const response = await axios.post(`http://localhost:8080/api/project?token=${token}`, project);
        return response.data;

    } catch (e) {
        console.error(e);
        throw new Error("Could not update project.");
    }
}